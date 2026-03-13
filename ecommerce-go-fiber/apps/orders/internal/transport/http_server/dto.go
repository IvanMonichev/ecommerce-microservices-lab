package http_server

type BatchGetUsersRequest struct {
	IDs []string `json:"ids"`
}
