package main

import (
	"context"
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/config"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/repository"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/service"
	httpclient "github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/transport/http_client"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/transport/http_server"
)

func main() {
	ctx := context.Background()
	env := config.LoadEnv()

	pool, err := config.NewPostgresPool(ctx, env)
	if err != nil {
		log.Fatalf("failed to connect postgres: %v", err)
	}
	defer pool.Close()

	orderRepo := repository.NewOrderRepository(pool)

	productsHTTPClient := httpclient.NewProductsHTTPClient(env.ProductsBaseURL)

	orderService := service.NewOrderService(
		orderRepo,
		productsHTTPClient,
		nil, // gRPC client позже
	)

	handler := http_server.NewHandler(orderService)

	app := fiber.New()

	app.Use(logger.New())

	http_server.RegisterRoutes(app, handler)

	log.Printf("orders service running on port %d", env.Port)

	if err := app.Listen(":" + env.Port); err != nil {
		log.Fatal(err)
	}
}
