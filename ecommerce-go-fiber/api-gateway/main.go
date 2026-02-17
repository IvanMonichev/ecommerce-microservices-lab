package main

import (
	"io"
	"net/http"
	"os"
	"time"

	"github.com/gofiber/fiber/v3"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	usersBase := os.Getenv("USERS_BASE_URL")
	if usersBase == "" {
		usersBase = "http://localhost:8081"
	}

	client := &http.Client{Timeout: 3 * time.Second}

	app := fiber.New()

	app.Get("/health", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{"service": "api-gateway", "status": "ok"})
	})

	app.Get("/api/users/:id", func(c fiber.Ctx) error {
		id := c.Params("id")

		resp, err := client.Get(usersBase + "/users/" + id)
		if err != nil {
			return fiber.NewError(fiber.StatusBadGateway, "users service unavailable")
		}
		defer resp.Body.Close()

		body, _ := io.ReadAll(resp.Body)
		c.Status(resp.StatusCode)
		c.Set("Content-Type", resp.Header.Get("Content-Type"))
		return c.Send(body)
	})

	_ = app.Listen(":" + port)
}
