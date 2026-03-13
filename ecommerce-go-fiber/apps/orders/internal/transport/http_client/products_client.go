package httpclient

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/products"
)

type ProductsHTTPClient struct {
	baseURL string
	client  *http.Client
}

func NewProductsHTTPClient(baseURL string) *ProductsHTTPClient {
	return &ProductsHTTPClient{
		baseURL: baseURL,
		client: &http.Client{
			Timeout: 3 * time.Second,
		},
	}
}

func (c *ProductsHTTPClient) Batch(ctx context.Context, ids []string) ([]products.ProductDTO, error) {
	if len(ids) == 0 {
		return []products.ProductDTO{}, nil
	}

	payload := map[string]any{
		"ids": ids,
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequestWithContext(
		ctx,
		http.MethodPost,
		c.baseURL+"/batch",
		bytes.NewReader(body),
	)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")

	res, err := c.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("products service error: %w", err)
	}
	defer res.Body.Close()

	if res.StatusCode < 200 || res.StatusCode >= 300 {
		return nil, fmt.Errorf("products service returned status %d", res.StatusCode)
	}

	var result []products.ProductDTO
	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		return nil, err
	}

	return result, nil
}
