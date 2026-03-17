package http

import "github.com/gofiber/fiber/v3"

func RegisterRoutes(app *fiber.App, handler *Handler) {
	api := app.Group("/api")
	api.Post("/notify/order-status", handler.NotifyOrderStatus)
}
