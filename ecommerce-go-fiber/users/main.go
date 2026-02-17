package main

import (
	"os"

	"github.com/gofiber/fiber/v3"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	app := fiber.New()

	_ = app.Listen(":" + port)
}
