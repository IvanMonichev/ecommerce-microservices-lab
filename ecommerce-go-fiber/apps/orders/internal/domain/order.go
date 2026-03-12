package domain

import (
	"time"

	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
)

type Order struct {
	ID        string
	UserID    string
	Status    orders.OrderStatus
	Currency  common.Currency
	Items     []OrderItem
	CreatedAt time.Time
	UpdatedAt time.Time
}

type OrderItem struct {
	ProductID string
	Quantity  int
}
