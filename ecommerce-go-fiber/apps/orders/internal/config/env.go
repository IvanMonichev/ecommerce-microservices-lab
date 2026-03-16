package config

import (
	"fmt"
	"os"
	"strconv"
)

type Env struct {
	Port             string
	ServiceName      string
	PostgresHost     string
	PostgresPort     int
	PostgresDB       string
	PostgresUser     string
	PostgresPassword string
	ProductsBaseURL  string
	ProductsGRPCAddr string
	RabbitURL        string
}

func required(name string) string {
	value := os.Getenv(name)
	if value == "" {
		panic(fmt.Sprintf("missing env var: %s", name))
	}
	return value
}

func getString(name, fallback string) string {
	value := os.Getenv(name)
	if value == "" {
		return fallback
	}
	return value
}

func getInt(name string, fallback int) int {
	raw := os.Getenv(name)
	if raw == "" {
		return fallback
	}

	n, err := strconv.Atoi(raw)
	if err != nil {
		panic(fmt.Sprintf("invalid env var %s=%q", name, raw))
	}

	return n
}

func LoadEnv() Env {
	return Env{
		Port:             getString("PORT", "4020"),
		ServiceName:      getString("SERVICE_NAME", "orders"),
		PostgresHost:     getString("POSTGRES_HOST", "localhost"),
		PostgresPort:     getInt("POSTGRES_PORT", 5432),
		PostgresDB:       getString("POSTGRES_DB", "orders"),
		PostgresUser:     getString("POSTGRES_USER", "admin"),
		PostgresPassword: getString("POSTGRES_PASSWORD", "password"),
		ProductsBaseURL:  getString("PRODUCTS_BASE_URL", "http://localhost:4030/api/products"),
		ProductsGRPCAddr: getString("PRODUCTS_GRPC_ADDRESS", "0.0.0.0:50051"),
		RabbitURL:        getString("RABBIT_URL", "amqp://localhost:5672"),
	}
}
