package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/config"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/repository"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/service"
	grpcclient "github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/transport/grpc_client"
	httpclient "github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/transport/http_client"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/transport/http_server"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/transport/rabbitmq"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	env := config.LoadEnv()

	pool, err := config.NewPostgresPool(ctx, env)
	if err != nil {
		log.Fatalf("failed to connect postgres: %v", err)
	}
	defer pool.Close()

	orderRepo := repository.NewOrderRepository(pool)

	productsHTTPClient := httpclient.NewProductsHTTPClient(env.ProductsHTTPURL + "/api/products")

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

	statusUpdateConsumer, err := rabbitmq.NewStatusUpdateConsumer(env.RabbitURL, orderRepo)
	if err != nil {
		log.Fatalf("failed to create rabbitmq consumer: %v", err)
	}
	defer func() {
		if err := statusUpdateConsumer.Close(); err != nil {
			log.Printf("failed to close rabbitmq consumer: %v", err)
		}
	}()

	if err := statusUpdateConsumer.Start(ctx); err != nil {
		log.Fatalf("failed to start rabbitmq consumer: %v", err)
	}

	handler := http_server.NewHandler(orderService)

	app := fiber.New()
	app.Use(logger.New())

	http_server.RegisterRoutes(app, handler)

	go func() {
		log.Printf("orders service running on port %s", env.Port)

		if err := app.Listen(":" + env.Port); err != nil {
			log.Printf("fiber server stopped: %v", err)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	<-stop

	log.Println("shutting down orders service...")

	cancel()

	if err := app.Shutdown(); err != nil {
		log.Printf("failed to shutdown fiber app: %v", err)
	}

	log.Println("orders service stopped")
}
