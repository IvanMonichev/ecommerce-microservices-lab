package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Env struct {
	AppPort      string
	MongoURI     string
	MongoDBName  string
	UserCollName string
}

func LoadEnv() Env {
	loadDotEnv()

	return Env{
		AppPort:      getEnv("APP_PORT", "3010"),
		MongoURI:     getEnv("MONGO_URI", "mongodb://admin:password@localhost:27017"),
		MongoDBName:  getEnv("MONGO_DB_NAME", "users_db"),
		UserCollName: getEnv("USER_COLLECTION_NAME", "users"),
	}
}

func loadDotEnv() {
	if err := godotenv.Load(".env"); err == nil {
		log.Printf(".env loaded")
		return
	}

	log.Println(".env file not found, using system environment variables")
}

func getEnv(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}
