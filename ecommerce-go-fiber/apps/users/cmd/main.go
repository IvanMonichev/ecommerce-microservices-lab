package main

import (
	"context"
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/users/internal/config"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/users/internal/repository"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/users/internal/service"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/users/internal/transport/http"
)

func main() {
	ctx := context.Background()
	env := config.LoadEnv()

	mongoClient, err := config.NewMongoClient(ctx, env.MongoURI)
	if err != nil {
		log.Fatalf("failed to connect to mongo: %v", err)
	}

	db := mongoClient.Database(env.MongoDBName)
	userCollection := db.Collection(env.UserCollName)

	userRepo := repository.NewUserRepository(userCollection)
	userService := service.NewUserService(userRepo)
	handler := http.NewHandler(userService)

	app := fiber.New()

	app.Use(logger.New())

	http.RegisterRoutes(app, handler)

	log.Printf("users service started on port %s", env.AppPort)
	log.Fatal(app.Listen(":" + env.AppPort))
}
