package orders

type OrderStatus string

const (
	OrderStatusNew       OrderStatus = "NEW"
	OrderStatusCanceled  OrderStatus = "CANCELLED"
	OrderStatusCompleted OrderStatus = "COMPLETED"
)
