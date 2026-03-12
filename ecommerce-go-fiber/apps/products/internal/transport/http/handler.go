package http

import (
	"errors"

	"github.com/gofiber/fiber/v3"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/mapper"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/products/internal/service"
	contractProducts "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/products"
)

type Handler struct {
	productService service.ProductService
}

func NewHandler(userService service.ProductService) *Handler {
	return &Handler{
		productService: userService,
	}
}

func (h *Handler) Create(c fiber.Ctx) error {
	var dto contractProducts.CreateProductDTO

	if err := c.Bind().Body(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	product, err := h.productService.Create(c.Context(), dto)
	if err != nil {
		if errors.Is(err, service.ErrInvalidProductInput) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "failed to create product",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(mapper.ToProductDTO(product))
}

func (h *Handler) FindAll(c fiber.Ctx) error {
	products, err := h.productService.FindAll(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "failed to fetch products",
		})
	}

	return c.Status(fiber.StatusOK).JSON(mapper.ToProductsDTO(products))
}

func (h *Handler) FindByID(c fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "id is required",
		})
	}

	product, err := h.productService.FindByID(c.Context(), id)
	if err != nil {
		if errors.Is(err, service.ErrProductNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid product id",
		})
	}

	return c.Status(fiber.StatusOK).JSON(mapper.ToProductDTO(*product))
}

func (h *Handler) FindByIDs(c fiber.Ctx) error {
	var req struct {
		IDs []string `json:"ids"`
	}

	if err := c.Bind().Body(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	if len(req.IDs) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "ids are required",
		})
	}

	products, err := h.productService.FindByIDs(c.Context(), req.IDs)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid product ids",
		})
	}

	return c.Status(fiber.StatusOK).JSON(mapper.ToProductsDTO(products))
}
