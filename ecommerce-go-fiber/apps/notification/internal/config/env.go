package config

import (
	"fmt"
	"os"
)

type Env struct {
	Port      string
	RabbitURL string
}

func getOrDefault(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}

func GetEnv() Env {
	return Env{
		Port:      getOrDefault("PORT", "4040"),
		RabbitURL: getOrDefault("RABBIT_URL", "amqp://admin:password@localhost:5672"),
	}
}

func MustGetEnv() Env {
	env := GetEnv()

	if env.RabbitURL == "" {
		panic(fmt.Errorf("RABBIT_URL is required"))
	}

	return env
}
