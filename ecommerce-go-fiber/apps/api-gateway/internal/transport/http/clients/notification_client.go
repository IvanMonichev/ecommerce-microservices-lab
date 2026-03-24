package clients

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"time"

	contractorders "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
)

type NotificationHTTPClient struct {
	baseURL string
	client  *http.Client
	sem     chan struct{}
}

func NewNotificationHTTPClient(baseURL string) *NotificationHTTPClient {
	transport := &http.Transport{
		Proxy:                 http.ProxyFromEnvironment,
		DialContext:           (&net.Dialer{Timeout: 2 * time.Second, KeepAlive: 30 * time.Second}).DialContext,
		ForceAttemptHTTP2:     true,
		MaxIdleConns:          512,
		MaxIdleConnsPerHost:   256,
		MaxConnsPerHost:       256,
		IdleConnTimeout:       90 * time.Second,
		TLSHandshakeTimeout:   2 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
	}

	return &NotificationHTTPClient{
		baseURL: baseURL,
		client: &http.Client{
			Timeout:   4 * time.Second,
			Transport: transport,
		},
		// Limit in-flight calls to notification to prevent local port exhaustion.
		sem: make(chan struct{}, 128),
	}
}

func (c *NotificationHTTPClient) UpdateOrderStatus(
	ctx context.Context,
	payload contractorders.OrderStatusUpdate,
) error {
	reqBody, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	select {
	case c.sem <- struct{}{}:
		defer func() { <-c.sem }()
	case <-ctx.Done():
		return ctx.Err()
	}

	backoffs := []time.Duration{20 * time.Millisecond, 50 * time.Millisecond, 100 * time.Millisecond}

	for attempt := 0; attempt <= len(backoffs); attempt++ {
		req, err := http.NewRequestWithContext(
			ctx,
			http.MethodPost,
			c.baseURL+"/api/notify/order-status",
			bytesReader(reqBody),
		)
		if err != nil {
			return err
		}
		req.Header.Set("Content-Type", "application/json")

		res, err := c.client.Do(req)
		if err != nil {
			if attempt < len(backoffs) && isRetryableDialError(err) {
				select {
				case <-time.After(backoffs[attempt]):
					continue
				case <-ctx.Done():
					return ctx.Err()
				}
			}
			return err
		}
		defer res.Body.Close()
		_, _ = io.Copy(io.Discard, res.Body)

		if res.StatusCode >= 400 {
			return fmt.Errorf("notification request failed with status %d", res.StatusCode)
		}

		return nil
	}

	return fmt.Errorf("notification request failed after retries")
}
