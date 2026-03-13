package common

type PaginationQuery struct {
	Page  int `query:"page" json:"page"`
	Limit int `query:"limit" json:"limit"`
}

func (q PaginationQuery) Normalize() PaginationQuery {
	if q.Page < 1 {
		q.Page = 1
	}

	if q.Limit <= 0 {
		q.Limit = 20
	}

	if q.Limit > 100 {
		q.Limit = 100
	}

	return q
}

func (q PaginationQuery) Offset() int {
	q = q.Normalize()
	return (q.Page - 1) * q.Limit
}
