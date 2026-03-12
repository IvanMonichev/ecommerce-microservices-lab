package main

import (
	"context"
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/users/internal/config"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/users/internal/infrastructure/mongo"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/users/internal/service"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/users/internal/transport/http"
)

func main() {
	ctx := context.Background()
	env := config.LoadEnv()

	mongoClient, err := config.NewMongoClient(ctx, env.UserMongoURI)
	if err != nil {
		log.Fatalf("failed to connect to mongo: %v", err)
	}

	db := mongoClient.Database(env.UserMongoDBName)
	userCollection := db.Collection(env.UserCollName)

	userRepo := mongo.NewUserRepository(userCollection)
	userService := service.NewUserService(userRepo)
	handler := http.NewHandler(userService)

	app := fiber.New()

	app.Use(logger.New())

	http.RegisterRoutes(app, handler)

	log.Printf("users service started on port %s", env.UserPort)
	log.Fatal(app.Listen(":" + env.UserPort))
}
