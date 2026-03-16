package http_server

import "github.com/gofiber/fiber/v3"

func RegisterRoutes(app *fiber.App, handler *Handler) {

	orders := app.Group("/api/orders")
	orders.Post("/", handler.CreateOrder)
	orders.Get("/:id", handler.GetOrderByID)
	orders.Get("/all/http", handler.GetOrdersHTTP)
	orders.Get("/all/grpc", handler.GetOrdersGRPC)
}
