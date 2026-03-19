package service

import (
	"context"
	"fmt"

	"github.com/ivanmonichev/ecommerce-go-fiber/apps/api-gateway/internal/transport/http/clients"
	contractcommon "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"
	contractorders "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
	contractusers "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/users"
)

type OrderService struct {
	ordersClient       *clients.OrdersHTTPClient
	notificationClient *clients.NotificationHTTPClient
	usersClient        *clients.UsersHTTPClient
}

func NewOrderService(
	ordersClient *clients.OrdersHTTPClient,
	notificationClient *clients.NotificationHTTPClient,
	usersClient *clients.UsersHTTPClient,
) *OrderService {
	return &OrderService{
		ordersClient:       ordersClient,
		notificationClient: notificationClient,
		usersClient:        usersClient,
	}
}

func (s *OrderService) mapOrderToView(
	order contractorders.OrderWithProductDTO,
	user contractusers.UserDTO,
) contractorders.OrderViewDTO {
	return contractorders.OrderViewDTO{
		ID:        order.ID,
		Status:    order.Status,
		Currency:  order.Currency,
		Products:  order.Products,
		CreatedAt: order.CreatedAt,
		UpdatedAt: order.UpdatedAt,
		User:      user,
	}
}

func (s *OrderService) enrichOrder(
	ctx context.Context,
	order contractorders.OrderWithProductDTO,
) (*contractorders.OrderViewDTO, error) {
	user, err := s.usersClient.GetUserByID(ctx, order.UserID)
	if err != nil {
		return nil, err
	}

	result := s.mapOrderToView(order, *user)
	return &result, nil
}

func (s *OrderService) enrichOrders(
	ctx context.Context,
	paginatedOrders contractcommon.PaginatedResponse[contractorders.OrderWithProductDTO],
) (*contractcommon.PaginatedResponse[contractorders.OrderViewDTO], error) {
	userIDs := make([]string, 0, len(paginatedOrders.Data))
	for _, order := range paginatedOrders.Data {
		userIDs = append(userIDs, order.UserID)
	}

	usersMap, err := s.usersClient.GetUsersByIDs(ctx, userIDs)
	if err != nil {
		return nil, err
	}

	data := make([]contractorders.OrderViewDTO, 0, len(paginatedOrders.Data))
	for _, order := range paginatedOrders.Data {
		user, ok := usersMap[order.UserID]
		if !ok {
			return nil, fmt.Errorf("user not found for order %s", order.ID)
		}

		data = append(data, s.mapOrderToView(order, user))
	}

	return &contractcommon.PaginatedResponse[contractorders.OrderViewDTO]{
		Data:  data,
		Total: paginatedOrders.Total,
		Page:  paginatedOrders.Page,
		Limit: paginatedOrders.Limit,
	}, nil
}

func (s *OrderService) GetOrdersByHTTP(
	ctx context.Context,
	page int,
	limit int,
) (*contractcommon.PaginatedResponse[contractorders.OrderViewDTO], error) {
	orders, err := s.ordersClient.GetOrdersByHTTP(ctx, page, limit)
	if err != nil {
		return nil, err
	}

	return s.enrichOrders(ctx, *orders)
}

func (s *OrderService) GetOrdersByGRPC(
	ctx context.Context,
	page int,
	limit int,
) (*contractcommon.PaginatedResponse[contractorders.OrderViewDTO], error) {
	orders, err := s.ordersClient.GetOrdersByGRPC(ctx, page, limit)
	if err != nil {
		return nil, err
	}

	return s.enrichOrders(ctx, *orders)
}

func (s *OrderService) CreateOrder(
	ctx context.Context,
	payload contractorders.CreateOrderDTO,
) (*contractorders.CreateOrderDTO, error) {
	order, err := s.ordersClient.CreateOrder(ctx, payload)
	if err != nil {
		return nil, err
	}

	return order, err
}

func (s *OrderService) UpdateOrderStatus(
	ctx context.Context,
	payload contractorders.OrderStatusUpdate,
) error {
	return s.notificationClient.UpdateOrderStatus(ctx, payload)
}
