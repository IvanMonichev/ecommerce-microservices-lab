package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Env struct {
	UserPort        string
	UserMongoURI    string
	UserMongoDBName string
	UserCollName    string
}

func LoadEnv() Env {
	loadDotEnv()

	return Env{
		UserPort:        getEnv("USER_PORT", "4010"),
		UserMongoURI:    getEnv("USER_MONGO_URI", "mongodb://admin:password@localhost:27017"),
		UserMongoDBName: getEnv("USER_MONGO_DB_NAME", "users_db"),
		UserCollName:    getEnv("USER_COLLECTION_NAME", "users"),
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
