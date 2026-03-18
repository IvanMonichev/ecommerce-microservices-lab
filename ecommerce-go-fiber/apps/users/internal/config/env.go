package config

import (
	"os"
)

type Env struct {
	UserPort        string
	UserMongoURI    string
	UserMongoDBName string
	UserCollName    string
}

func getEnv(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}

func LoadEnv() Env {

	return Env{
		UserPort:        getEnv("PORT", "4010"),
		UserMongoURI:    getEnv("MONGO_URI", "mongodb://admin:password@localhost:27017"),
		UserMongoDBName: getEnv("MONGO_DB_NAME", "users_db"),
		UserCollName:    getEnv("COLLECTION_NAME", "users"),
	}
}
