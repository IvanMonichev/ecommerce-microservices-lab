package grpcclient

import (
	"context"

	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/products"
)

type ProductsGRPCClient interface {
	Batch(ctx context.Context, ids []string) ([]products.ProductDTO, error)
}
