package http

import "github.com/gofiber/fiber/v3"

func RegisterRoutes(app *fiber.App, handler *Handler) {
	app.Get("/health", handler.Health)

	users := app.Group("/api/users")
	users.Post("/", handler.CreateUser)
	users.Get("/", handler.GetUsers)
	users.Get("/:id", handler.GetUserByID)
}
