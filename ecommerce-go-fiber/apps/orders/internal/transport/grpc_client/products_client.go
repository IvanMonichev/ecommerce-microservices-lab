package grpcclient

import (
	"context"
	"time"

	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/products"
	productsv1 "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type ProductsGRPCClient interface {
	Batch(ctx context.Context, ids []string) ([]products.ProductDTO, error)
	Close() error
}

type productsGRPCClient struct {
	client productsv1.ProductsServiceClient
	conn   *grpc.ClientConn
}

func NewProductsGRPCClient(addr string) (ProductsGRPCClient, error) {
	conn, err := grpc.Dial(
		addr,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if err != nil {
		return nil, err
	}

	return &productsGRPCClient{
		client: productsv1.NewProductsServiceClient(conn),
		conn:   conn,
	}, nil
}

func (c *productsGRPCClient) Close() error {
	return c.conn.Close()
}

func (c *productsGRPCClient) Batch(
	ctx context.Context,
	ids []string,
) ([]products.ProductDTO, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	resp, err := c.client.Batch(ctx, &productsv1.BatchProductsRequest{
		Ids: ids,
	})
	if err != nil {
		return nil, err
	}

	result := make([]products.ProductDTO, 0, len(resp.GetProducts()))
	for _, product := range resp.GetProducts() {
		result = append(result, products.ProductDTO{
			ID:        product.GetId(),
			Name:      product.GetName(),
			Price:     product.GetPrice(),
			Currency:  common.Currency(product.GetCurrency()),
			CreatedAt: product.GetCreatedAt(),
			UpdatedAt: product.GetUpdatedAt(),
		})
	}

	return result, nil
}
