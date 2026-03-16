package main

import (
	"context"
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/config"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/repository"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/service"
	grpcclient "github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/transport/grpc_client"
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

	productsHTTPClient := httpclient.NewProductsHTTPClient(env.ProductsHTTPURL)

	productsGRPCClient, err := grpcclient.NewProductsGRPCClient(env.ProductsGRPCAddr)
	if err != nil {
		log.Fatalf("failed to create products grpc client: %v", err)
	}
	defer productsGRPCClient.Close()

	orderService := service.NewOrderService(
		orderRepo,
		productsHTTPClient,
		productsGRPCClient,
	)

	handler := http_server.NewHandler(orderService)

	app := fiber.New()
	app.Use(logger.New())

	http_server.RegisterRoutes(app, handler)

	log.Printf("orders service running on port %s", env.Port)

	if err := app.Listen(":" + env.Port); err != nil {
		log.Fatal(err)
	}
}
