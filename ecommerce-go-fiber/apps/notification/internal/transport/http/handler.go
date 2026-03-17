package http

import (
	"github.com/gofiber/fiber/v3"
	notificationservice "github.com/ivanmonichev/ecommerce-go-fiber/apps/notification/internal/service"
	contract "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
)

type Handler struct {
	publisher *notificationservice.Publisher
}

func NewHandler(publisher *notificationservice.Publisher) *Handler {
	return &Handler{
		publisher: publisher,
	}
}

func (h *Handler) NotifyOrderStatus(c fiber.Ctx) error {
	var body contract.OrderStatusUpdate

	if err := c.Bind().Body(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	if body.OrderID == "" || body.Status == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "orderId and status are required",
		})
	}

	if err := h.publisher.PublishOrderStatusUpdate(c.Context(), body); err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"message": "rabbit publish failed: " + err.Error(),
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{
		"ok": true,
	})
}
