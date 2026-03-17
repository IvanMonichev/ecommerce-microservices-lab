package service

import (
	"context"
	"encoding/json"
	"fmt"

	amqp "github.com/rabbitmq/amqp091-go"

	contract "github.com/ivanmonichev/ecommerce-go-fiber/shared/contracts/orders"
)

const (
	OrdersExchange        = "orders"
	OrderStatusRoutingKey = "orders.status.update"
)

type Publisher struct {
	conn *amqp.Connection
	ch   *amqp.Channel
}

func NewPublisher(rabbitURL string) (*Publisher, error) {
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

	return &Publisher{
		conn: conn,
		ch:   ch,
	}, nil
}

func (p *Publisher) PublishOrderStatusUpdate(
	ctx context.Context,
	payload contract.OrderStatusUpdate,
) error {
	body, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("marshal payload: %w", err)
	}

	err = p.ch.PublishWithContext(
		ctx,
		OrdersExchange,
		OrderStatusRoutingKey,
		false,
		false,
		amqp.Publishing{
			ContentType:  "application/json",
			DeliveryMode: amqp.Persistent,
			Body:         body,
		},
	)
	if err != nil {
		return fmt.Errorf("publish message: %w", err)
	}

	return nil
}

func (p *Publisher) Close() error {
	if p.ch != nil {
		_ = p.ch.Close()
	}

	if p.conn != nil {
		return p.conn.Close()
	}

	return nil
}
