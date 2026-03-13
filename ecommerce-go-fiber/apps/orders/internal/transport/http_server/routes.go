package http_server

import "github.com/gofiber/fiber/v3"

func RegisterRoutes(app *fiber.App, handler *Handler) {

	users := app.Group("/api/users")
	users.Post("/", handler.CreateUser)
	users.Get("/", handler.GetUsers)
	users.Get("/:id", handler.GetUserByID)
	users.Post("/batch", handler.BatchGetUsers)
}
