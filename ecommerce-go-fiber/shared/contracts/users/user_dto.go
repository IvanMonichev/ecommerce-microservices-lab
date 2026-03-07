package users

type UserDTO struct {
	ID        string `json:"_id"`
	Email     string `json:"email"`
	Name      string `json:"name"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

type CreateUserDTO struct {
	Email string `json:"email"`
	Name  string `json:"name"`
}
