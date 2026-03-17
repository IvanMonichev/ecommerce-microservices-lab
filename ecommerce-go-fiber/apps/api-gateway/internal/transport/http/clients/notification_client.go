package clients

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	contractorders "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
)

type NotificationHTTPClient struct {
	baseURL string
	client  *http.Client
}

func NewNotificationHTTPClient(baseURL string) *NotificationHTTPClient {
	return &NotificationHTTPClient{
		baseURL: baseURL,
		client:  &http.Client{},
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
		return err
	}
	defer res.Body.Close()

	if res.StatusCode >= 400 {
		return fmt.Errorf("notification request failed with status %d", res.StatusCode)
	}

	return nil
}
