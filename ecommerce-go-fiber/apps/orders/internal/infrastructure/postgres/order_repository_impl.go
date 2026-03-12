package postgres

import (
	"context"

	"github.com/google/uuid"
	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/domain"
	"github.com/jackc/pgx/v5/pgxpool"
)

type OrderRepository struct {
	pool *pgxpool.Pool
}

func NewOrderRepository(pool *pgxpool.Pool) *OrderRepository {
	return &OrderRepository{pool: pool}
}

func (r *OrderRepository) Create(ctx context.Context, order domain.Order) (domain.Order, error) {
	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return domain.Order{}, err
	}
	defer tx.Rollback(ctx)

	orderID := uuid.NewString()

	err = tx.QueryRow(
		ctx,
		`
		INSERT INTO orders (id, user_id, status, currency)
		VALUES ($1, $2, $3, $4)
		RETURNING created_at, updated_at
		`,
		orderID,
		order.UserID,
		order.Status,
		order.Currency,
	).Scan(&order.CreatedAt, &order.UpdatedAt)

	if err != nil {
		return domain.Order{}, err
	}

	for _, item := range order.Items {
		_, err = tx.Exec(
			ctx,
			`
			INSERT INTO order_items (order_id, product_id, quantity)
			VALUES ($1, $2, $3)
			`,
			orderID,
			item.ProductID,
			item.Quantity,
		)
		if err != nil {
			return domain.Order{}, err
		}
	}

	if err = tx.Commit(ctx); err != nil {
		return domain.Order{}, err
	}

	order.ID = orderID
	return order, nil
}

func (r *OrderRepository) FindByID(ctx context.Context, id string) (*domain.Order, error) {
	var order domain.Order

	err := r.pool.QueryRow(
		ctx,
		`
		SELECT id, user_id, status, currency, created_at, updated_at
		FROM orders
		WHERE id = $1
		`,
		id,
	).Scan(
		&order.ID,
		&order.UserID,
		&order.Status,
		&order.Currency,
		&order.CreatedAt,
		&order.UpdatedAt,
	)
	if err != nil {
		return nil, nil
	}

	rows, err := r.pool.Query(
		ctx,
		`
		SELECT product_id, quantity, price
		FROM order_items
		WHERE order_id = $1
		`,
		id,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	items := make([]domain.OrderItem, 0)
	for rows.Next() {
		var item domain.OrderItem
		if err := rows.Scan(&item.ProductID, &item.Quantity, &item.Price); err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	order.Items = items
	return &order, nil
}

func (r *OrderRepository) FindAll(ctx context.Context, params domain.ListOrdersParams) (domain.ListOrdersResult, error) {
	rows, err := r.pool.Query(
		ctx,
		`
		SELECT id, user_id, status, currency, created_at, updated_at
		FROM orders
		ORDER BY created_at DESC
		LIMIT $1 OFFSET $2
		`,
		params.Limit,
		params.Offset,
	)
	if err != nil {
		return domain.ListOrdersResult{}, err
	}
	defer rows.Close()

	result := make([]domain.Order, 0)
	for rows.Next() {
		var order domain.Order
		if err := rows.Scan(
			&order.ID,
			&order.UserID,
			&order.Status,
			&order.Currency,
			&order.CreatedAt,
			&order.UpdatedAt,
		); err != nil {
			return domain.ListOrdersResult{}, err
		}

		result = append(result, order)
	}

	var total int
	if err := r.pool.QueryRow(ctx, `SELECT COUNT(*) FROM orders`).Scan(&total); err != nil {
		return domain.ListOrdersResult{}, err
	}

	return domain.ListOrdersResult{
		Rows:  result,
		Total: total,
	}, nil
}
