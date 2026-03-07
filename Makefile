INFRA_COMPOSE_FILE := infrastructure/docker-compose.yml
SEEDS_DIR := infrastructure/seeds

.PHONY: infra-up infra-down infra-restart infra-logs infra-ps infra-clean

infra-up:
	docker compose -f $(COMPOSE_FILE) up -d

infra-clean:
	docker compose -f $(COMPOSE_FILE) down -v

seeds-install:
	@if [ ! -d "$(SEEDS_DIR)/node_modules" ]; then \
		echo "Installing seeds dependencies..."; \
		cd $(SEEDS_DIR) && npm install; \
	fi

seed: seeds-install seed-users seed-products seed-orders

seed-products:
	cd $(SEEDS_DIR) && npm run seed:products

seed-users:
	cd $(SEEDS_DIR) && npm run seed:users

seed-orders:
	cd $(SEEDS_DIR) && npm run seed:orders