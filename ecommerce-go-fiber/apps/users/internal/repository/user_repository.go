package repository

import (
	"context"
	"errors"
	"time"

	"github.com/ivanmonichev/ecommerce-go-fiber/apps/users/internal/domain"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type UserRepository interface {
	Create(ctx context.Context, user domain.User) (domain.User, error)
	FindAll(ctx context.Context) ([]domain.User, error)
	FindByID(ctx context.Context, id string) (*domain.User, error)
	FindByIDs(ctx context.Context, ids []string) ([]domain.User, error)
}

type mongoUserRepository struct {
	collection *mongo.Collection
}

func NewUserRepository(collection *mongo.Collection) UserRepository {
	return &mongoUserRepository{
		collection: collection,
	}
}

func (r *mongoUserRepository) Create(ctx context.Context, user domain.User) (domain.User, error) {
	now := time.Now().UTC()
	user.CreatedAt = now
	user.UpdatedAt = now

	result, err := r.collection.InsertOne(ctx, user)
	if err != nil {
		return domain.User{}, err
	}

	user.ID = result.InsertedID.(bson.ObjectID)
	return user, nil
}

func (r *mongoUserRepository) FindAll(ctx context.Context) ([]domain.User, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var users []domain.User
	if err := cursor.All(ctx, &users); err != nil {
		return nil, err
	}

	return users, nil
}

func (r *mongoUserRepository) FindByID(ctx context.Context, id string) (*domain.User, error) {
	objectID, err := bson.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var user domain.User
	err = r.collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&user)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}

func (r *mongoUserRepository) FindByIDs(ctx context.Context, ids []string) ([]domain.User, error) {
	unique := make(map[string]struct{})
	for _, id := range ids {
		unique[id] = struct{}{}
	}

	objectIDs := make([]bson.ObjectID, 0, len(unique))

	for id := range unique {
		oid, err := bson.ObjectIDFromHex(id)
		if err != nil {
			continue
		}
		objectIDs = append(objectIDs, oid)
	}

	filter := bson.M{
		"_id": bson.M{
			"$in": objectIDs,
		},
	}

	cursor, err := r.collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var users []domain.User

	if err := cursor.All(ctx, &users); err != nil {
		return nil, err
	}

	return users, nil
}
