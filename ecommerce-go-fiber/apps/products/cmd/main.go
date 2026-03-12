package main

import (
	"context"
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/config"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/repository"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/service"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/transport/http"
)

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
	log.Fatal(app.Listen(":" + env.ProductPort))
}
