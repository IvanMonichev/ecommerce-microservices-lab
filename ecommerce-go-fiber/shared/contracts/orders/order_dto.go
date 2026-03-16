package orders

import (
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/users"
)

type OrderDTO struct {
	ID        string         `json:"id"`
	UserID    string         `json:"userId"`
	Status    OrderStatus    `json:"status"`
	Items     []OrderItemDTO `json:"items"`
	CreatedAt string         `json:"createdAt"`
	UpdatedAt string         `json:"updatedAt"`
}

type OrderWithProductDTO struct {
	ID        string            `json:"id"`
	UserID    string            `json:"userId"`
	Status    OrderStatus       `json:"status"`
	Currency  common.Currency   `json:"currency"`
	Products  []OrderProductDTO `json:"products"`
	CreatedAt string            `json:"createdAt"`
	UpdatedAt string            `json:"updatedAt"`
}

type CreateOrderDTO struct {
	UserID   string          `json:"userId"`
	Currency common.Currency `json:"currency"`
	Items    []OrderItemDTO  `json:"items"`
}

type OrderStatusUpdate struct {
	OrderID string      `json:"orderId"`
	Status  OrderStatus `json:"status"`
}

type OrderViewDTO struct {
	ID        string            `json:"id"`
	Status    OrderStatus       `json:"status"`
	Currency  common.Currency   `json:"currency"`
	Products  []OrderProductDTO `json:"products"`
	User      users.UserDTO     `json:"product"`
	CreatedAt string            `json:"createdAt"`
	UpdatedAt string            `json:"updatedAt"`
}
