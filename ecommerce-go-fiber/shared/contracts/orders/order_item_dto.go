package orders

import "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/products"

type OrderItemDTO struct {
	ProductID string `json:"productId"`
	Quantity  int    `json:"quantity"`
}

type OrderProductDTO struct {
	products.ProductDTO
	Quantity int `json:"quantity"`
}
