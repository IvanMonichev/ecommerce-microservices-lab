package repository

import (
	"context"
	"errors"
	"sort"

	"github.com/ivanmonichev/ecommerce-go-fiber/apps/orders/internal/domain"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/common"
	"github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

var ErrOrderNotFound = errors.New("order not found")

type FindAllResult struct {
	Rows  []domain.Order
	Total int
}

type OrderRepository struct {
	pool *pgxpool.Pool
}

type PaginationParams struct {
	Offset int
	Limit  int
}

func NewOrderRepository(pool *pgxpool.Pool) *OrderRepository {
	return &OrderRepository{pool: pool}
}

func (r *OrderRepository) Create(ctx context.Context, dto orders.CreateOrderDTO) (domain.Order, error) {
	tx, err := r.pool.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return domain.Order{}, err
	}
	defer tx.Rollback(ctx)

	var order domain.Order

	createOrderQuery := `
		INSERT INTO orders (user_id, status, currency)
		VALUES ($1, $2, $3)
		RETURNING id, user_id, status, currency, created_at, updated_at
	`

	err = tx.QueryRow(ctx, createOrderQuery, dto.UserID, orders.OrderStatusNew, dto.Currency).
		Scan(
			&order.ID,
			&order.UserID,
			&order.Status,
			&order.Currency,
			&order.CreatedAt,
			&order.UpdatedAt,
		)
	if err != nil {
		return domain.Order{}, err
	}

	insertItemQuery := `
		INSERT INTO order_items (order_id, product_id, quantity)
		VALUES ($1, $2, $3)
	`

	order.Items = make([]domain.OrderItem, 0, len(dto.Items))

	for _, item := range dto.Items {
		_, err := tx.Exec(ctx, insertItemQuery, order.ID, item.ProductID, item.Quantity)
		if err != nil {
			return domain.Order{}, err
		}

		order.Items = append(order.Items, domain.OrderItem{
			ProductID: item.ProductID,
			Quantity:  item.Quantity,
		})
	}

	if err := tx.Commit(ctx); err != nil {
		return domain.Order{}, err
	}

	return order, nil
}

func (r *OrderRepository) FindByID(ctx context.Context, id string) (domain.Order, error) {
	orderQuery := `
		SELECT id, user_id, status, currency, created_at, updated_at
		FROM orders
		WHERE id = $1
	`

	var order domain.Order

	err := r.pool.QueryRow(ctx, orderQuery, id).
		Scan(
			&order.ID,
			&order.UserID,
			&order.Status,
			&order.Currency,
			&order.CreatedAt,
			&order.UpdatedAt,
		)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return domain.Order{}, ErrOrderNotFound
		}
		return domain.Order{}, err
	}

	items, err := r.findItemsByOrderIDs(ctx, []string{order.ID})
	if err != nil {
		return domain.Order{}, err
	}

	order.Items = items[order.ID]

	return order, nil
}

func (r *OrderRepository) FindAll(ctx context.Context, params PaginationParams) (FindAllResult, error) {
	totalQuery := `SELECT COUNT(*) FROM orders`

	var total int
	if err := r.pool.QueryRow(ctx, totalQuery).Scan(&total); err != nil {
		return FindAllResult{}, err
	}

	query := `
		SELECT id, user_id, status, currency, created_at, updated_at
		FROM orders
		ORDER BY created_at DESC
		OFFSET $1
		LIMIT $2
	`

	rows, err := r.pool.Query(ctx, query, params.Offset, params.Limit)
	if err != nil {
		return FindAllResult{}, err
	}
	defer rows.Close()

	result := make([]domain.Order, 0)

	for rows.Next() {
		var order domain.Order

		err := rows.Scan(
			&order.ID,
			&order.UserID,
			&order.Status,
			&order.Currency,
			&order.CreatedAt,
			&order.UpdatedAt,
		)
		if err != nil {
			return FindAllResult{}, err
		}

		result = append(result, order)
	}

	if err := rows.Err(); err != nil {
		return FindAllResult{}, err
	}

	orderIDs := make([]string, 0, len(result))
	for _, order := range result {
		orderIDs = append(orderIDs, order.ID)
	}

	itemsMap, err := r.findItemsByOrderIDs(ctx, orderIDs)
	if err != nil {
		return FindAllResult{}, err
	}

	for i := range result {
		result[i].Items = itemsMap[result[i].ID]
	}

	return FindAllResult{
		Rows:  result,
		Total: total,
	}, nil
}

func (r *OrderRepository) UpdateStatus(
	ctx context.Context,
	orderID string,
	status orders.OrderStatus,
) error {
	query := `
		UPDATE orders
		SET status = $2, updated_at = NOW()
		WHERE id = $1
	`

	tag, err := r.pool.Exec(ctx, query, orderID, status)
	if err != nil {
		return err
	}

	if tag.RowsAffected() == 0 {
		return ErrOrderNotFound
	}

	return nil
}

func (r *OrderRepository) findItemsByOrderIDs(
	ctx context.Context,
	orderIDs []string,
) (map[string][]domain.OrderItem, error) {
	result := make(map[string][]domain.OrderItem)

	if len(orderIDs) == 0 {
		return result, nil
	}

	query := `
		SELECT order_id, product_id, quantity
		FROM order_items
		WHERE order_id = ANY($1)
	`

	rows, err := r.pool.Query(ctx, query, orderIDs)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var orderID string
		var item domain.OrderItem

		if err := rows.Scan(&orderID, &item.ProductID, &item.Quantity); err != nil {
			return nil, err
		}

		result[orderID] = append(result[orderID], item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	for _, items := range result {
		sort.Slice(items, func(i, j int) bool {
			return items[i].ProductID < items[j].ProductID
		})
	}

	return result, nil
}

func ParseCurrency(value string) common.Currency {
	return common.Currency(value)
}
