package domain

import "context"

type UserRepository interface {
	Create(ctx context.Context, user User) (User, error)
	FindAll(ctx context.Context) ([]User, error)
	FindByID(ctx context.Context, id string) (*User, error)
	FindByIDs(ctx context.Context, ids []string) ([]User, error)
}
