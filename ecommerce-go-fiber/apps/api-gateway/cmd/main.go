package main

import (
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/logger"

	"github.com/ivanmonichev/ecommerce-go-fiber/apps/api-gateway/internal/config"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/api-gateway/internal/service"
	httptransport "github.com/ivanmonichev/ecommerce-go-fiber/apps/api-gateway/internal/transport/http"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/api-gateway/internal/transport/http/clients"
)

func main() {
	env := config.LoadEnv()

	ordersClient := clients.NewOrdersHTTPClient(env.OrdersServiceURL)
	notificationClient := clients.NewNotificationHTTPClient(env.NotificationServiceURL)
	usersClient := clients.NewUsersHTTPClient(env.UsersServiceURL)

	orderService := service.NewOrderService(
		ordersClient,
		notificationClient,
		usersClient,
	)

	handler := httptransport.NewHandler(orderService)

	app := fiber.New()
	app.Use(logger.New())

	httptransport.RegisterRoutes(app, handler)

	log.Printf("api-gateway running on port %s", env.Port)

	if err := app.Listen(":" + env.Port); err != nil {
		log.Fatal(err)
	}
}
