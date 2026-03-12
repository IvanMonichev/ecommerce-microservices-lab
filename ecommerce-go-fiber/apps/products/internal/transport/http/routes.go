package http

import "github.com/gofiber/fiber/v3"

func RegisterRoutes(app *fiber.App, handler *Handler) {

	products := app.Group("/api/products")
	products.Post("/", handler.Create)
	products.Get("/", handler.FindAll)
	products.Get("/:id", handler.FindByID)
	products.Post("/batch", handler.FindByIDs)
}
