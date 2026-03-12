package domain

import (
	"context"

	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
)

type OrderRepository interface {
	Create(ctx context.Context, order Order) (Order, error)
	FindByID(ctx context.Context, id string) (*Order, error)
	FindAll(ctx context.Context, params common.ListOrdersQuery) (common.PaginatedResponse[orders.OrderDTO], error)
}
