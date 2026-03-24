package clients

import (
	"context"
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"net/url"
	"strconv"
	"time"

	contractcommon "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"
	contractorders "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
)

type OrdersHTTPClient struct {
	baseURL string
	client  *http.Client
	sem     chan struct{}
}

const (
	ordersMaxConnsPerHost = 32
	ordersMaxIdleConns    = 64
)

func NewOrdersHTTPClient(baseURL string) *OrdersHTTPClient {
	transport := &http.Transport{
		Proxy:                 http.ProxyFromEnvironment,
		DialContext:           (&net.Dialer{Timeout: 2 * time.Second, KeepAlive: 30 * time.Second}).DialContext,
		ForceAttemptHTTP2:     true,
		// Keep the downstream pool deliberately small to avoid exhausting
		// ephemeral ports inside the Docker bridge network under k6 load.
		MaxIdleConns:          ordersMaxIdleConns,
		MaxIdleConnsPerHost:   ordersMaxConnsPerHost,
		MaxConnsPerHost:       ordersMaxConnsPerHost,
		IdleConnTimeout:       90 * time.Second,
		TLSHandshakeTimeout:   2 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
	}

	return &OrdersHTTPClient{
		baseURL: baseURL,
		client: &http.Client{
			Timeout:   4 * time.Second,
			Transport: transport,
		},
		// Align in-flight requests with the transport pool to avoid bursts of
		// fresh TCP dials when the orders service is already saturated.
		sem: make(chan struct{}, ordersMaxConnsPerHost),
	}
}

func (c *OrdersHTTPClient) GetOrdersByHTTP(
	ctx context.Context,
	page int,
	limit int,
) (*contractcommon.PaginatedResponse[contractorders.OrderWithProductDTO], error) {
	u, err := url.Parse(c.baseURL + "/api/orders/all/http")
	if err != nil {
		return nil, err
	}

	q := u.Query()
	q.Set("page", strconv.Itoa(page))
	q.Set("limit", strconv.Itoa(limit))
	u.RawQuery = q.Encode()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, u.String(), nil)
	if err != nil {
		return nil, err
	}

	res, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	if res.StatusCode >= 400 {
		return nil, fmt.Errorf("orders http request failed with status %d", res.StatusCode)
	}

	var result contractcommon.PaginatedResponse[contractorders.OrderWithProductDTO]
	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		return nil, err
	}

	return &result, nil
}

func (c *OrdersHTTPClient) GetOrdersByGRPC(
	ctx context.Context,
	page int,
	limit int,
) (*contractcommon.PaginatedResponse[contractorders.OrderWithProductDTO], error) {
	u, err := url.Parse(c.baseURL + "/api/orders/all/grpc")
	if err != nil {
		return nil, err
	}

	q := u.Query()
	q.Set("page", strconv.Itoa(page))
	q.Set("limit", strconv.Itoa(limit))
	u.RawQuery = q.Encode()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, u.String(), nil)
	if err != nil {
		return nil, err
	}

	res, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	if res.StatusCode >= 400 {
		return nil, fmt.Errorf("orders grpc request failed with status %d", res.StatusCode)
	}

	var result contractcommon.PaginatedResponse[contractorders.OrderWithProductDTO]
	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		return nil, err
	}

	return &result, nil
}

func (c *OrdersHTTPClient) CreateOrder(
	ctx context.Context,
	payload contractorders.CreateOrderDTO,
) (*contractorders.OrderDTO, error) {
	reqBody, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	select {
	case c.sem <- struct{}{}:
		defer func() { <-c.sem }()
	case <-ctx.Done():
		return nil, ctx.Err()
	}

	backoffs := []time.Duration{20 * time.Millisecond, 50 * time.Millisecond, 100 * time.Millisecond}
	var lastErr error

	for attempt := 0; attempt <= len(backoffs); attempt++ {
		req, err := http.NewRequestWithContext(
			ctx,
			http.MethodPost,
			c.baseURL+"/api/orders",
			bytesReader(reqBody),
		)
		if err != nil {
			return nil, err
		}
		req.Header.Set("Content-Type", "application/json")

		res, err := c.client.Do(req)
		if err != nil {
			lastErr = err
			if attempt < len(backoffs) && isRetryableDialError(err) {
				select {
				case <-time.After(backoffs[attempt]):
					continue
				case <-ctx.Done():
					return nil, ctx.Err()
				}
			}
			return nil, err
		}
		defer res.Body.Close()

		if res.StatusCode >= 400 {
			return nil, fmt.Errorf("create order failed with status %d", res.StatusCode)
		}

		var result contractorders.OrderDTO
		if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
			return nil, err
		}

		return &result, nil
	}

	return nil, fmt.Errorf("create order failed after retries: %w", lastErr)
}
