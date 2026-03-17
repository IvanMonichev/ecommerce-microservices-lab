package clients

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	contractusers "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/users"
)

type UsersHTTPClient struct {
	baseURL string
	client  *http.Client
}

func NewUsersHTTPClient(baseURL string) *UsersHTTPClient {
	return &UsersHTTPClient{
		baseURL: baseURL,
		client:  &http.Client{},
	}
}

func (c *UsersHTTPClient) GetUserByID(
	ctx context.Context,
	id string,
) (*contractusers.UserDTO, error) {
	req, err := http.NewRequestWithContext(
		ctx,
		http.MethodGet,
		c.baseURL+"/api/users/"+id,
		nil,
	)
	if err != nil {
		return nil, err
	}

	res, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	if res.StatusCode >= 400 {
		return nil, fmt.Errorf("get user failed with status %d", res.StatusCode)
	}

	var result contractusers.UserDTO
	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		return nil, err
	}

	return &result, nil
}

func (c *UsersHTTPClient) GetUsersByIDs(
	ctx context.Context,
	ids []string,
) (map[string]contractusers.UserDTO, error) {
	uniqueIDs := make([]string, 0, len(ids))
	seen := make(map[string]struct{})

	for _, id := range ids {
		if id == "" {
			continue
		}
		if _, ok := seen[id]; ok {
			continue
		}
		seen[id] = struct{}{}
		uniqueIDs = append(uniqueIDs, id)
	}

	if len(uniqueIDs) == 0 {
		return map[string]contractusers.UserDTO{}, nil
	}

	payload := map[string]any{
		"ids": uniqueIDs,
	}

	reqBody, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequestWithContext(
		ctx,
		http.MethodPost,
		c.baseURL+"/api/users/batch",
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
		return nil, fmt.Errorf("batch get users failed with status %d", res.StatusCode)
	}

	var users []contractusers.UserDTO
	if err := json.NewDecoder(res.Body).Decode(&users); err != nil {
		return nil, err
	}

	result := make(map[string]contractusers.UserDTO, len(users))
	for _, user := range users {
		result[user.ID] = user
	}

	return result, nil
}
