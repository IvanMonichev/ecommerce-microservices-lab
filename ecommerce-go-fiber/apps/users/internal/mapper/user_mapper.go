package mapper

import (
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/users/internal/domain"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/users"
)

const isoTime = "2006-01-02T15:04:05.000Z"

func ToUserDTO(user domain.User) users.UserDTO {
	return users.UserDTO{
		ID:        user.ID.Hex(),
		Email:     user.Email,
		Name:      user.Name,
		CreatedAt: user.CreatedAt.Format(isoTime),
		UpdatedAt: user.UpdatedAt.Format(isoTime),
	}
}
