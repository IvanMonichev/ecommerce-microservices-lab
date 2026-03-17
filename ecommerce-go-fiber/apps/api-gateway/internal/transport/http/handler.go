package http

import (
	"github.com/gofiber/fiber/v3"
	contractcommon "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"

	"github.com/ivanmonichev/ecommerce-go-fiber/apps/api-gateway/internal/service"
	contractorders "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
)

type Handler struct {
	orderService *service.OrderService
}

func NewHandler(orderService *service.OrderService) *Handler {
	return &Handler{
		orderService: orderService,
	}
}

func (h *Handler) GetOrdersByHTTP(c fiber.Ctx) error {
	var query contractcommon.PaginationQuery

	if err := c.Bind().Query(&query); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid query params",
		})
	}

	query = query.Normalize()

	result, err := h.orderService.GetOrdersByHTTP(
		c.Context(),
		query.Page,
		query.Limit,
	)
	if err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(result)
}

func (h *Handler) GetOrdersByGRPC(c fiber.Ctx) error {
	var query contractcommon.PaginationQuery

	if err := c.Bind().Query(&query); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid query params",
		})
	}

	query = query.Normalize()

	result, err := h.orderService.GetOrdersByGRPC(
		c.Context(),
		query.Page,
		query.Limit,
	)
	if err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(result)
}

func (h *Handler) CreateOrder(c fiber.Ctx) error {
	var body contractorders.CreateOrderDTO

	if err := c.Bind().Body(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	result, err := h.orderService.CreateOrder(c.Context(), body)
	if err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(result)
}

func (h *Handler) UpdateOrderStatus(c fiber.Ctx) error {
	var body contractorders.OrderStatusUpdate

	if err := c.Bind().Body(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	if err := h.orderService.UpdateOrderStatus(c.Context(), body); err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"ok": true,
	})
}
