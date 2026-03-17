package http

import "github.com/gofiber/fiber/v3"

func RegisterRoutes(app *fiber.App, handler *Handler) {
	api := app.Group("/api/orders")

	api.Get("/all/http", handler.GetOrdersByHTTP)
	api.Get("/all/grpc", handler.GetOrdersByGRPC)
	api.Post("/", handler.CreateOrder)
	api.Post("/notify/order-status", handler.UpdateOrderStatus)
}
