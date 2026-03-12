package http

import (
	"errors"

	"github.com/gofiber/fiber/v3"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/users/internal/mapper"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/users/internal/service"
	contractUsers "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/users"
)

type Handler struct {
	userService service.UserService
}

func NewHandler(userService service.UserService) *Handler {
	return &Handler{
		userService: userService,
	}
}

func (h *Handler) CreateUser(c fiber.Ctx) error {
	var dto contractUsers.CreateUserDTO

	if err := c.Bind().Body(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	user, err := h.userService.Create(c.Context(), dto)
	if err != nil {
		if errors.Is(err, service.ErrInvalidUserInput) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "internal server error",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(mapper.ToUserDTO(user))
}

func (h *Handler) GetUsers(c fiber.Ctx) error {
	users, err := h.userService.FindAll(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "internal server error",
			"error":   err.Error(),
		})
	}

	result := make([]contractUsers.UserDTO, 0, len(users))
	for _, user := range users {
		result = append(result, mapper.ToUserDTO(user))
	}

	return c.JSON(result)
}

func (h *Handler) GetUserByID(c fiber.Ctx) error {
	id := c.Params("id")

	user, err := h.userService.FindByID(c.Context(), id)
	if err != nil {
		if errors.Is(err, service.ErrUserNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"message": "user not found",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "internal server error",
		})
	}

	return c.JSON(mapper.ToUserDTO(*user))
}

func (h *Handler) BatchGetUsers(c fiber.Ctx) error {
	var req BatchGetUsersRequest

	if err := c.Bind().Body(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid request body",
		})
	}

	if len(req.IDs) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "ids cannot be empty",
		})
	}

	users, err := h.userService.FindByIDs(c.Context(), req.IDs)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	result := make([]contractUsers.UserDTO, 0, len(users))

	for _, user := range users {
		result = append(result, mapper.ToUserDTO(user))
	}

	return c.JSON(result)
}
