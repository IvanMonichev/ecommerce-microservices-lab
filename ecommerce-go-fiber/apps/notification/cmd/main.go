package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v3"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/notification/internal/config"
	notificationservice "github.com/ivanmonichev/ecommerce-go-fiber/apps/notification/internal/service"
	notificationhttp "github.com/ivanmonichev/ecommerce-go-fiber/apps/notification/internal/transport/http"
)

func main() {
	env := config.GetEnv()

	publisher, err := notificationservice.NewPublisher(env.RabbitURL)
	if err != nil {
		log.Fatalf("failed to create publisher: %v", err)
	}
	defer func() {
		if err := publisher.Close(); err != nil {
			log.Printf("publisher close error: %v", err)
		}
	}()

	app := fiber.New()

	handler := notificationhttp.NewHandler(publisher)
	notificationhttp.RegisterRoutes(app, handler)

	go func() {
		log.Printf("notification listening on :%s", env.Port)
		if err := app.Listen(":" + env.Port); err != nil {
			log.Fatalf("fiber listen error: %v", err)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	<-stop

	log.Println("shutting down notification service...")

	if err := app.Shutdown(); err != nil {
		log.Printf("app shutdown error: %v", err)
	}

	log.Println("notification service stopped")
}
