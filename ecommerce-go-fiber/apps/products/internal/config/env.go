package config

import (
	"os"
)

type Env struct {
	ProductPort        string
	ProductMongoURI    string
	ProductServiceName string
	GRPCServerPort     string
}

func required(name string, fallback string) string {
	value := os.Getenv(name)
	if value == "" {
		return fallback
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

func GetEnv() Env {
	return Env{
		ProductPort:        getString("PRODUCT_PORT", "4030"),
		ProductMongoURI:    required("PRODUCT_MONGO_URI", "mongodb://admin:password@localhost:27018/products?authSource=admin"),
		ProductServiceName: getString("SERVICE_NAME", "products"),
		GRPCServerPort:     getString("GRPC_SERVER_PORT", "50052"),
	}
}
