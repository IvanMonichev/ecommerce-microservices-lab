package httpclient

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net"
	"net/http"
	"syscall"
	"time"

	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/products"
)

type ProductsHTTPClient interface {
	Batch(ctx context.Context, ids []string) ([]products.ProductDTO, error)
}

type productsHTTPClient struct {
	baseURL string
	client  *http.Client
	sem     chan struct{}
}

func NewProductsHTTPClient(baseURL string) ProductsHTTPClient {
	transport := &http.Transport{
		Proxy:                 http.ProxyFromEnvironment,
		DialContext:           (&net.Dialer{Timeout: 2 * time.Second, KeepAlive: 30 * time.Second}).DialContext,
		ForceAttemptHTTP2:     true,
		MaxIdleConns:          1024,
		MaxIdleConnsPerHost:   256,
		MaxConnsPerHost:       256,
		IdleConnTimeout:       90 * time.Second,
		TLSHandshakeTimeout:   2 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
	}

	return &productsHTTPClient{
		baseURL: baseURL,
		client: &http.Client{
			Timeout:   4 * time.Second,
			Transport: transport,
		},
		// Protect downstream service and local ephemeral ports under load.
		sem: make(chan struct{}, 128),
	}
}

func (c *productsHTTPClient) Batch(
	ctx context.Context,
	ids []string,
) ([]products.ProductDTO, error) {
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
			c.baseURL+"/batch",
			bytes.NewReader(body),
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

	return nil, fmt.Errorf("products service error: %w", lastErr)
}

func isRetryableDialError(err error) bool {
	return errors.Is(err, syscall.EADDRNOTAVAIL) ||
		errors.Is(err, syscall.ECONNRESET) ||
		errors.Is(err, syscall.ECONNREFUSED)
}
