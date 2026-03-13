package mapper

import (
	"time"

	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/domain"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
	contractProducts "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/products"
)

func formatTime(t time.Time) string {
	return t.UTC().Format(time.RFC3339)
}

func ToOrderDTO(order domain.Order) orders.OrderDTO {
	items := make([]orders.OrderItemDTO, 0, len(order.Items))
	for _, item := range order.Items {
		items = append(items, orders.OrderItemDTO{
			ProductID: item.ProductID,
			Quantity:  item.Quantity,
		})
	}

	return orders.OrderDTO{
		ID:        order.ID,
		UserID:    order.UserID,
		Status:    order.Status,
		Items:     items,
		CreatedAt: formatTime(order.CreatedAt),
		UpdatedAt: formatTime(order.UpdatedAt),
	}
}

func ToOrderWithProductsDTO(
	order domain.Order,
	products []contractProducts.ProductDTO,
) orders.OrderWithProductDTO {
	productMap := newProductMap(products)
	resultProducts := make([]orders.OrderProductDTO, 0, len(order.Items))

	for _, item := range order.Items {
		product, ok := productMap[item.ProductID]
		if !ok {
			continue
		}

		resultProducts = append(resultProducts, orders.OrderProductDTO{
			ProductDTO: product,
			Quantity:   item.Quantity,
		})
	}

	return orders.OrderWithProductDTO{
		ID:        order.ID,
		UserID:    order.UserID,
		Status:    order.Status,
		Currency:  order.Currency,
		Products:  resultProducts,
		CreatedAt: formatTime(order.CreatedAt),
		UpdatedAt: formatTime(order.UpdatedAt),
	}
}

func newProductMap(products []contractProducts.ProductDTO) map[string]contractProducts.ProductDTO {
	m := make(map[string]contractProducts.ProductDTO, len(products))

	for _, p := range products {
		m[p.ID] = p
	}

	return m
}
