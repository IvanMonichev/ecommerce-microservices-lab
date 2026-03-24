CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS orders
(
    id         UUID PRIMARY KEY     DEFAULT gen_random_uuid(),
    user_id    TEXT        NOT NULL,
    status     VARCHAR(32) NOT NULL,
    currency   CHAR(3)     NOT NULL DEFAULT 'RUB',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items
(
    id         UUID PRIMARY KEY     DEFAULT gen_random_uuid(),
    order_id   UUID NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    quantity   INT  NOT NULL CHECK (quantity > 0)
);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders (user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);
CREATE UNIQUE INDEX IF NOT EXISTS uq_order_items_order_product ON order_items (order_id, product_id);
