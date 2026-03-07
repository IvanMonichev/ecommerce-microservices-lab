package products

import "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"

type ProductDTO struct {
	ID        string          `json:"id"`
	ProductID string          `json:"productId"`
	Name      string          `json:"name"`
	Price     string          `json:"price"`
	Currency  common.Currency `json:"currency"`
	CreatedAt string          `json:"createdAt"`
	UpdatedAt string          `json:"updatedAt"`
}
