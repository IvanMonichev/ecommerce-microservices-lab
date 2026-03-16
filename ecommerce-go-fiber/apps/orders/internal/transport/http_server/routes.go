package http_server

import "github.com/gofiber/fiber/v3"

func RegisterRoutes(app *fiber.App, handler *Handler) {

	users := app.Group("/api/orders")
	users.Post("/", handler.CreateOrder)
	users.Get("/:id", handler.GetOrderByID)
	users.Get("/all/http", handler.GetOrdersHTTP)
}
