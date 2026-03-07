package common

type ListOrdersQuery struct {
	Page  int `query:"page" json:"page"`
	Limit int `query:"limit" json:"limit"`
}
