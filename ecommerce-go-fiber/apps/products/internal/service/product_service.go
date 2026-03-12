package service

import (
	"context"
	"errors"
	"strings"

	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/domain"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/repository"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"
	contractProducts "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/products"
)

var ErrInvalidProductInput = errors.New("invalid product input")
var ErrProductNotFound = errors.New("product not found")

type ProductService interface {
	Create(ctx context.Context, dto contractProducts.CreateProductDTO) (domain.Product, error)
	FindAll(ctx context.Context) ([]domain.Product, error)
	FindByID(ctx context.Context, id string) (*domain.Product, error)
	FindByIDs(ctx context.Context, ids []string) ([]domain.Product, error)
}

type productService struct {
	repo repository.ProductRepository
}

func NewProductService(repo repository.ProductRepository) ProductService {
	return &productService{repo: repo}
}

func (s *productService) Create(ctx context.Context, dto contractProducts.CreateProductDTO) (domain.Product, error) {
	name := strings.TrimSpace(dto.Name)
	price := strings.TrimSpace(dto.Price)

	if name == "" || price == "" {
		return domain.Product{}, ErrInvalidProductInput
	}

	currency := dto.Currency
	if currency == "" {
		currency = common.CurrencyRUB
	}

	product := domain.Product{
		Name:     name,
		Price:    price,
		Currency: currency,
	}

	return s.repo.Create(ctx, product)
}

func (s *productService) FindAll(ctx context.Context) ([]domain.Product, error) {
	return s.repo.FindAll(ctx)
}

func (s *productService) FindByID(ctx context.Context, id string) (*domain.Product, error) {
	product, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}

	if product == nil {
		return nil, ErrProductNotFound
	}

	return product, nil
}

func (s *productService) FindByIDs(ctx context.Context, ids []string) ([]domain.Product, error) {
	return s.repo.FindByIDs(ctx, ids)
}
