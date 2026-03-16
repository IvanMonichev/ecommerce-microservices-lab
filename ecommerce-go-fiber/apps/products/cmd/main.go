package main

import (
	"context"
	"fmt"
	"log"
	"net"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/config"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/repository"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/service"
	productgrpc "github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/transport/grpc"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/transport/http"
	productsv1 "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/proto"
	"google.golang.org/grpc"
)

func runGRPCServer(productService service.ProductService, addr string) error {
	lis, err := net.Listen("tcp", addr)
	if err != nil {
		return err
	}

	grpcServer := grpc.NewServer()
	productsv1.RegisterProductsServiceServer(
		grpcServer,
		productgrpc.NewServer(productService),
	)

	log.Printf("products grpc server started on %s", addr)

	return grpcServer.Serve(lis)
}

func main() {
	ctx := context.Background()
	env := config.GetEnv()

	mongoClient, err := config.NewMongoClient(ctx, env.ProductMongoURI)
	if err != nil {
		log.Fatalf("failed to connect to mongo: %v", err)
	}

	db := mongoClient.Database("products")

	productRepo := repository.NewProductRepository(db)
	productService := service.NewProductService(productRepo)
	handler := http.NewHandler(productService)

	app := fiber.New()

	app.Use(logger.New())

	http.RegisterRoutes(app, handler)

	log.Printf("users service started on port %s", env.ProductPort)

	// Запуск gRPC-сервера

	addr := fmt.Sprintf(":%s", env.GRPCServerPort)
	go func() {
		if err := runGRPCServer(productService, addr); err != nil {
			log.Fatalf("failed to run grpc server: %v", err)
		}
	}()

	log.Fatal(app.Listen(":" + env.ProductPort))

}
