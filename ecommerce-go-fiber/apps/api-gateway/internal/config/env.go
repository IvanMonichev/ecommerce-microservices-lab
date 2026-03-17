package config

import (
	"os"
)

type Env struct {
	Port                   string
	OrdersServiceURL       string
	UsersServiceURL        string
	NotificationServiceURL string
}

func getOrDefault(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}

func LoadEnv() Env {
	return Env{
		Port:                   getOrDefault("PORT", "4000"),
		OrdersServiceURL:       getOrDefault("ORDERS_SERVICE_URL", "http://localhost:4020"),
		UsersServiceURL:        getOrDefault("USERS_SERVICE_URL", "http://localhost:4010"),
		NotificationServiceURL: getOrDefault("NOTIFICATION_SERVICE_URL", "http://localhost:4040"),
	}
}
