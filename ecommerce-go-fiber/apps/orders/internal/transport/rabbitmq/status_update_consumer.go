package rabbitmq

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	contract "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
	amqp "github.com/rabbitmq/amqp091-go"
)

const (
	OrdersExchange        = "orders"
	OrderStatusRoutingKey = "orders.status.update"
	OrderStatusQueue      = "orders.status.update.q"
)

type OrderStatusUpdater interface {
	UpdateStatus(ctx context.Context, orderID string, status contract.OrderStatus) error
}

type StatusUpdateConsumer struct {
	conn *amqp.Connection
	ch   *amqp.Channel
	repo OrderStatusUpdater
}

func NewStatusUpdateConsumer(
	rabbitURL string,
	repo OrderStatusUpdater,
) (*StatusUpdateConsumer, error) {
	conn, err := amqp.Dial(rabbitURL)
	if err != nil {
		return nil, fmt.Errorf("connect rabbit: %w", err)
	}

	ch, err := conn.Channel()
	if err != nil {
		_ = conn.Close()
		return nil, fmt.Errorf("create channel: %w", err)
	}

	if err := ch.ExchangeDeclare(
		OrdersExchange,
		"topic",
		true,
		false,
		false,
		false,
		nil,
	); err != nil {
		_ = ch.Close()
		_ = conn.Close()
		return nil, fmt.Errorf("declare exchange: %w", err)
	}

	q, err := ch.QueueDeclare(
		OrderStatusQueue,
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		_ = ch.Close()
		_ = conn.Close()
		return nil, fmt.Errorf("declare queue: %w", err)
	}

	if err := ch.QueueBind(
		q.Name,
		OrderStatusRoutingKey,
		OrdersExchange,
		false,
		nil,
	); err != nil {
		_ = ch.Close()
		_ = conn.Close()
		return nil, fmt.Errorf("bind queue: %w", err)
	}

	if err := ch.Qos(1, 0, false); err != nil {
		_ = ch.Close()
		_ = conn.Close()
		return nil, fmt.Errorf("set qos: %w", err)
	}

	return &StatusUpdateConsumer{
		conn: conn,
		ch:   ch,
		repo: repo,
	}, nil
}

func (c *StatusUpdateConsumer) Start(ctx context.Context) error {
	msgs, err := c.ch.Consume(
		OrderStatusQueue,
		"",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return fmt.Errorf("consume messages: %w", err)
	}

	go func() {
		for {
			select {
			case <-ctx.Done():
				return
			case msg, ok := <-msgs:
				if !ok {
					return
				}

				var payload contract.OrderStatusUpdate
				if err := json.Unmarshal(msg.Body, &payload); err != nil {
					log.Printf("invalid message json: %v", err)
					_ = msg.Ack(false)
					continue
				}

				if payload.OrderID == "" || payload.Status == "" {
					log.Printf("invalid payload: %+v", payload)
					_ = msg.Ack(false)
					continue
				}

				if err := c.repo.UpdateStatus(ctx, payload.OrderID, payload.Status); err != nil {
					log.Printf("update status failed: %v", err)
					_ = msg.Nack(false, true)
					continue
				}

				_ = msg.Ack(false)
			}
		}
	}()

	return nil
}

func (c *StatusUpdateConsumer) Close() error {
	if c.ch != nil {
		_ = c.ch.Close()
	}
	if c.conn != nil {
		return c.conn.Close()
	}
	return nil
}
