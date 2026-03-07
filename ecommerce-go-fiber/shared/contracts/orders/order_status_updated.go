package orders

type OrderStatusUpdated struct {
	OrderID string      `json:"orderId"`
	Status  OrderStatus `json:"status"`
}
