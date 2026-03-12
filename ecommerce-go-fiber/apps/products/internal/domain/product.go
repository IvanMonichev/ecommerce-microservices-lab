package domain

import (
	"time"

	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"
	"go.mongodb.org/mongo-driver/v2/bson"
)

type Product struct {
	ID        bson.ObjectID   `bson:"_id,omitempty"`
	Name      string          `bson:"name"`
	Price     string          `bson:"price"`
	Currency  common.Currency `bson:"currency"`
	CreatedAt time.Time       `bson:"createdAt"`
	UpdatedAt time.Time       `bson:"updatedAt"`
}
