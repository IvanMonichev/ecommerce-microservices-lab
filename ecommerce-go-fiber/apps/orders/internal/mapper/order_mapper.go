package service

import (
	"context"
	"errors"
	"strings"

	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/domain"
	contractOrders "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
)

var ErrInvalidOrderInput = errors.New("invalid order input")
var ErrOrderNotFound = errors.New("order not found")

type OrderService struct {
	repo domain.OrderRepository
}

func NewOrderService(repo domain.OrderRepository) *OrderService {
	return &OrderService{repo: repo}
}

func (s *OrderService) Create(ctx context.Context, dto contractOrders.CreateOrderDTO) (domain.Order, error) {
	if strings.TrimSpace(dto.UserID) == "" {
		return domain.Order{}, ErrInvalidOrderInput
	}

	if len(dto.Items) == 0 {
		return domain.Order{}, ErrInvalidOrderInput
	}

	items := make([]domain.OrderItem, 0, len(dto.Items))
	for _, item := range dto.Items {
		if strings.TrimSpace(item.ProductID) == "" || item.Quantity <= 0 {
			return domain.Order{}, ErrInvalidOrderInput
		}

		items = append(items, domain.OrderItem{
			ProductID: strings.TrimSpace(item.ProductID),
			Quantity:  item.Quantity,
		})
	}

	order := domain.Order{
		UserID:   strings.TrimSpace(dto.UserID),
		Status:   contractOrders.OrderStatusNew,
		Currency: dto.Currency,
		Items:    items,
	}

	return s.repo.Create(ctx, order)
}

func (s *OrderService) FindByID(ctx context.Context, id string) (*domain.Order, error) {
	order, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if order == nil {
		return nil, ErrOrderNotFound
	}
	return order, nil
}

func (s *OrderService) FindAll(ctx context.Context, limit, offset int) (domain.ListOrdersResult, error) {
	if limit <= 0 {
		limit = 20
	}
	if limit > 100 {
		limit = 100
	}
	if offset < 0 {
		offset = 0
	}

	return s.repo.FindAll(ctx, domain.ListOrdersParams{
		Limit:  limit,
		Offset: offset,
	})
}
