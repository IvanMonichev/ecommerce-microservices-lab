package http

type BatchGetUsersRequest struct {
	IDs []string `json:"ids"`
}
