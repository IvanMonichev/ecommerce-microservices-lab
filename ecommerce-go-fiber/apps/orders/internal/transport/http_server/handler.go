package http_server

import (
	"errors"

	"github.com/gofiber/fiber/v3"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/service"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
)

type Handler struct {
	orderService *service.OrderService
}

func NewHandler(orderService *service.OrderService) *Handler {
	return &Handler{
		orderService: orderService,
	}
}

func (h *Handler) CreateOrder(c fiber.Ctx) error {
	var dto orders.CreateOrderDTO

	if err := c.Bind().Body(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	order, err := h.orderService.Create(c.Context(), dto)
	if err != nil {
		if errors.Is(err, service.ErrItemsRequired) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "internal server error",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(order)
}

func (h *Handler) GetOrderByID(c fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "id is required",
		})
	}

	order, err := h.orderService.GetByID(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "internal server error",
		})
	}

	return c.Status(fiber.StatusOK).JSON(order)
}

func (h *Handler) GetOrdersHTTP(c fiber.Ctx) error {
	var query common.PaginationQuery

	if err := c.Bind().Query(&query); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid query params",
		})
	}

	result, err := h.orderService.ListAllHTTP(c.Context(), query)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "internal server error",
		})
	}

	return c.Status(fiber.StatusOK).JSON(result)
}
