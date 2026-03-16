package config

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

func NewPostgresPool(ctx context.Context, env Env) (*pgxpool.Pool, error) {
	dsn := fmt.Sprintf(
		"postgres://%s:%s@%s:%d/%s?sslmode=disable",
		env.PostgresUser,
		env.PostgresPassword,
		env.PostgresHost,
		env.PostgresPort,
		env.PostgresDB,
	)

	return pgxpool.New(ctx, dsn)
}
