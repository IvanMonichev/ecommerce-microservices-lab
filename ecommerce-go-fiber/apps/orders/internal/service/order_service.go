package service

import (
	"context"
	"errors"
	"fmt"

	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/domain"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/mapper"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/repository"
	grpcclient "github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/transport/grpc_client"
	httpclient "github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/transport/http_client"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/products"
)

var ErrItemsRequired = errors.New("items is required")
var ErrInvalidOrderStatus = errors.New("invalid order status")

type OrderService struct {
	repo               *repository.OrderRepository
	productsHTTPClient httpclient.ProductsHTTPClient
	productsGRPCClient grpcclient.ProductsGRPCClient
}

func NewOrderService(
	repo *repository.OrderRepository,
	productsHTTPClient httpclient.ProductsHTTPClient,
	productsGRPCClient grpcclient.ProductsGRPCClient,
) *OrderService {
	return &OrderService{
		repo:               repo,
		productsHTTPClient: productsHTTPClient,
		productsGRPCClient: productsGRPCClient,
	}
}

func (s *OrderService) Create(
	ctx context.Context,
	dto orders.CreateOrderDTO,
) (orders.OrderDTO, error) {
	if len(dto.Items) == 0 {
		return orders.OrderDTO{}, ErrItemsRequired
	}

	if dto.Currency == "" {
		dto.Currency = common.Currency("RUB")
	}

	created, err := s.repo.Create(ctx, dto)
	if err != nil {
		return orders.OrderDTO{}, err
	}

	return mapper.ToOrderDTO(created), nil
}

func (s *OrderService) GetByID(
	ctx context.Context,
	orderID string,
) (orders.OrderDTO, error) {
	order, err := s.repo.FindByID(ctx, orderID)
	if err != nil {
		return orders.OrderDTO{}, err
	}

	return mapper.ToOrderDTO(order), nil
}

func (s *OrderService) ListAllHTTP(
	ctx context.Context,
	query common.PaginationQuery,
) (common.PaginatedResponse[orders.OrderWithProductDTO], error) {
	query = query.Normalize()

	result, err := s.repo.FindAll(ctx, repository.PaginationParams{
		Offset: query.Offset(),
		Limit:  query.Limit,
	})
	if err != nil {
		return common.PaginatedResponse[orders.OrderWithProductDTO]{}, fmt.Errorf("find all orders: %w", err)
	}

	ids := collectProductIDs(result.Rows)

	productsList, err := s.productsHTTPClient.Batch(ctx, ids)
	if err != nil {
		return common.PaginatedResponse[orders.OrderWithProductDTO]{}, fmt.Errorf("fetch products by http: %w", err)
	}

	return s.buildOrdersWithProducts(query, result, productsList), nil
}

func (s *OrderService) ListAllGRPC(
	ctx context.Context,
	query common.PaginationQuery,
) (common.PaginatedResponse[orders.OrderWithProductDTO], error) {
	query = query.Normalize()

	result, err := s.repo.FindAll(ctx, repository.PaginationParams{
		Offset: query.Offset(),
		Limit:  query.Limit,
	})
	if err != nil {
		return common.PaginatedResponse[orders.OrderWithProductDTO]{}, fmt.Errorf("find all orders: %w", err)
	}

	ids := collectProductIDs(result.Rows)

	productsList, err := s.productsGRPCClient.Batch(ctx, ids)
	if err != nil {
		return common.PaginatedResponse[orders.OrderWithProductDTO]{}, fmt.Errorf("fetch products by grpc: %w", err)
	}

	return s.buildOrdersWithProducts(query, result, productsList), nil
}

/*
func (s *OrderService) ListAllGRPC(

	ctx context.Context,
	query common.PaginationQuery,

	) (common.PaginatedResponse[orders.OrderWithProductDTO], error) {
		query = query.Normalize()

		result, err := s.repo.FindAll(ctx, repository.PaginationParams{
			Offset: query.Offset(),
			Limit:  query.Limit,
		})
		if err != nil {
			return common.PaginatedResponse[orders.OrderWithProductDTO]{}, err
		}

		ids := collectProductIDs(result.Rows)

		productsList, err := s.productsGRPCClient.Batch(ctx, ids)
		if err != nil {
			return common.PaginatedResponse[orders.OrderWithProductDTO]{}, err
		}

		return s.buildOrdersWithProducts(query, result, productsList), nil
	}
*/
func (s *OrderService) buildOrdersWithProducts(
	query common.PaginationQuery,
	result repository.FindAllResult,
	products []products.ProductDTO,
) common.PaginatedResponse[orders.OrderWithProductDTO] {
	items := make([]orders.OrderWithProductDTO, 0, len(result.Rows))

	for _, row := range result.Rows {
		items = append(items, mapper.ToOrderWithProductsDTO(row, products))
	}

	return common.PaginatedResponse[orders.OrderWithProductDTO]{
		Data:  items,
		Total: result.Total,
		Page:  query.Page,
		Limit: query.Limit,
	}
}

func (s *OrderService) UpdateStatus(
	ctx context.Context,
	dto orders.OrderStatusUpdate,
) error {
	if !isValidStatus(dto.Status) {
		return ErrInvalidOrderStatus
	}

	return s.repo.UpdateStatus(ctx, dto.OrderID, dto.Status)
}

func isValidStatus(status orders.OrderStatus) bool {
	switch status {
	case orders.OrderStatusNew, orders.OrderStatusCanceled, orders.OrderStatusCompleted:
		return true
	default:
		return false
	}
}

func collectProductIDs(orders []domain.Order) []string {
	uniq := make(map[string]struct{})

	for _, order := range orders {
		for _, item := range order.Items {
			uniq[item.ProductID] = struct{}{}
		}
	}

	result := make([]string, 0, len(uniq))
	for id := range uniq {
		result = append(result, id)
	}

	return result
}
