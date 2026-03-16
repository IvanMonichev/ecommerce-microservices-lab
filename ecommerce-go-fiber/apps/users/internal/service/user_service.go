package service

import (
	"context"
	"errors"
	"strings"

	"github.com/ivanmonichev/ecommerce-go-fiber/apps/users/internal/domain"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/users"
)

var ErrInvalidUserInput = errors.New("invalid product input")
var ErrUserNotFound = errors.New("product not found")

type UserService interface {
	Create(ctx context.Context, dto users.CreateUserDTO) (domain.User, error)
	FindAll(ctx context.Context) ([]domain.User, error)
	FindByID(ctx context.Context, id string) (*domain.User, error)
	FindByIDs(ctx context.Context, ids []string) ([]domain.User, error)
}

type userService struct {
	repo domain.UserRepository
}

func NewUserService(repo domain.UserRepository) UserService {
	return &userService{repo: repo}
}

func (s *userService) Create(ctx context.Context, dto users.CreateUserDTO) (domain.User, error) {
	if strings.TrimSpace(dto.Email) == "" {
		return domain.User{}, ErrInvalidUserInput
	}

	user := domain.User{
		Email: strings.TrimSpace(dto.Email),
		Name:  strings.TrimSpace(dto.Name),
	}

	return s.repo.Create(ctx, user)
}

func (s *userService) FindAll(ctx context.Context) ([]domain.User, error) {
	return s.repo.FindAll(ctx)
}

func (s *userService) FindByID(ctx context.Context, id string) (*domain.User, error) {
	user, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, ErrUserNotFound
	}
	return user, nil
}

func (s *userService) FindByIDs(ctx context.Context, ids []string) ([]domain.User, error) {
	users, err := s.repo.FindByIDs(ctx, ids)
	if err != nil {
		return nil, err
	}

	return users, nil
}
