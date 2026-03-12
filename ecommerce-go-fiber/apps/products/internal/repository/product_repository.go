package repository

import (
	"context"
	"time"

	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/domain"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type ProductRepository interface {
	Create(ctx context.Context, product domain.Product) (domain.Product, error)
	FindAll(ctx context.Context) ([]domain.Product, error)
	FindByID(ctx context.Context, id string) (*domain.Product, error)
	FindByIDs(ctx context.Context, ids []string) ([]domain.Product, error)
}

type productRepository struct {
	collection *mongo.Collection
}

func NewProductRepository(db *mongo.Database) ProductRepository {
	return &productRepository{
		collection: db.Collection("products"),
	}
}

func (r *productRepository) Create(ctx context.Context, product domain.Product) (domain.Product, error) {
	now := time.Now()

	product.CreatedAt = now
	product.UpdatedAt = now

	result, err := r.collection.InsertOne(ctx, product)
	if err != nil {
		return domain.Product{}, err
	}

	product.ID = result.InsertedID.(bson.ObjectID)

	return product, nil
}

func (r *productRepository) FindAll(ctx context.Context) ([]domain.Product, error) {
	opts := options.Find().SetSort(bson.D{
		{Key: "createdAt", Value: -1},
	})

	cursor, err := r.collection.Find(ctx, bson.M{}, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	products := make([]domain.Product, 0)
	for cursor.Next(ctx) {
		var product domain.Product
		if err := cursor.Decode(&product); err != nil {
			return nil, err
		}

		products = append(products, product)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return products, nil
}

func (r *productRepository) FindByID(ctx context.Context, id string) (*domain.Product, error) {
	objectID, err := bson.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var product domain.Product

	err = r.collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&product)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	return &product, nil
}

func (r *productRepository) FindByIDs(ctx context.Context, ids []string) ([]domain.Product, error) {
	objectIDs := make([]bson.ObjectID, 0, len(ids))

	for _, id := range ids {
		objectID, err := bson.ObjectIDFromHex(id)
		if err != nil {
			return nil, err
		}

		objectIDs = append(objectIDs, objectID)
	}

	if len(objectIDs) == 0 {
		return []domain.Product{}, nil
	}

	cursor, err := r.collection.Find(ctx, bson.M{
		"_id": bson.M{
			"$in": objectIDs,
		},
	})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	products := make([]domain.Product, 0)
	for cursor.Next(ctx) {
		var product domain.Product
		if err := cursor.Decode(&product); err != nil {
			return nil, err
		}

		products = append(products, product)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return products, nil
}
