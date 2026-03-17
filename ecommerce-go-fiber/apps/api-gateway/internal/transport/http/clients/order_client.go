package clients

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"

	contractcommon "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"
	contractorders "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
)

type OrdersHTTPClient struct {
	baseURL string
	client  *http.Client
}

func NewOrdersHTTPClient(baseURL string) *OrdersHTTPClient {
	return &OrdersHTTPClient{
		baseURL: baseURL,
		client:  &http.Client{},
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
) (*contractorders.OrderWithProductDTO, error) {
	reqBody, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

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
		return nil, err
	}
	defer res.Body.Close()

	if res.StatusCode >= 400 {
		return nil, fmt.Errorf("create order failed with status %d", res.StatusCode)
	}

	var result contractorders.OrderWithProductDTO
	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		return nil, err
	}

	return &result, nil
}
