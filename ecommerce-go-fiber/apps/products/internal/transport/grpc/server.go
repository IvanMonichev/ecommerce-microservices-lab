package grpc

import (
	"context"

	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/service"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/common"
	productsv1 "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/proto"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Server struct {
	productsv1.UnimplementedProductsServiceServer
	productService service.ProductService
}

func NewServer(productService service.ProductService) *Server {
	return &Server{
		productService: productService,
	}
}

func (s *Server) Batch(
	ctx context.Context,
	req *productsv1.BatchProductsRequest,
) (*productsv1.BatchProductsResponse, error) {
	ids := req.GetIds()

	if len(ids) == 0 {
		return nil, status.Error(codes.InvalidArgument, "ids are required")
	}

	products, err := s.productService.FindByIDs(ctx, ids)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	response := &productsv1.BatchProductsResponse{
		Products: make([]*productsv1.Product, 0, len(products)),
	}

	for _, product := range products {
		response.Products = append(response.Products, &productsv1.Product{
			Id:        product.ID.Hex(),
			Name:      product.Name,
			Price:     product.Price,
			Currency:  string(product.Currency),
			CreatedAt: product.CreatedAt.Format(common.RFC3339Milli),
			UpdatedAt: product.UpdatedAt.Format(common.RFC3339Milli),
		})
	}

	return response, nil
}
