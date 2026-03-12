package mapper

import (
	"time"

	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/domain"
	contractProducts "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/products"
)

func ToProductDTO(product domain.Product) contractProducts.ProductDTO {
	return contractProducts.ProductDTO{
		ID:        product.ID.Hex(),
		Name:      product.Name,
		Price:     product.Price,
		Currency:  product.Currency,
		CreatedAt: product.CreatedAt.Format(time.RFC3339),
		UpdatedAt: product.UpdatedAt.Format(time.RFC3339),
	}
}

func ToProductsDTO(products []domain.Product) []contractProducts.ProductDTO {
	result := make([]contractProducts.ProductDTO, 0, len(products))
	for _, product := range products {
		result = append(result, ToProductDTO(product))
	}
	return result
}
