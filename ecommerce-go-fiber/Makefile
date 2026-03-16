PROTO_DIR=shared/contracts/proto
PROTO_FILES=$(PROTO_DIR)/*.proto


run-users:
	go run ./apps/users/cmd

build-users:
	go build -o bin/users ./apps/users/cmd

run-products:
	go run ./apps/products/cmd

build-products:
	go build -o bin/products ./apps/products/cmd

proto:
	protoc \
		--go_out=. --go_opt=paths=source_relative \
		--go-grpc_out=. --go-grpc_opt=paths=source_relative \
		$(PROTO_FILES)