CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS orders
(
    id         UUID PRIMARY KEY     DEFAULT gen_random_uuid(),
    user_id    UUID        NOT NULL,
    status     VARCHAR(32) NOT NULL,
    currency   VARCHAR(16) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items
(
    order_id   UUID NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    product_id UUID NOT NULL,
    quantity   INT  NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (order_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders (user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);