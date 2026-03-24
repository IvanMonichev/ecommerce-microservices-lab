package orders

type OrderStatus string

const (
	OrderStatusNew       OrderStatus = "NEW"
	OrderStatusCanceled  OrderStatus = "CANCELED"
	OrderStatusCompleted OrderStatus = "COMPLETED"
)
