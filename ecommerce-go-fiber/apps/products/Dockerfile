FROM golang:1.26.1-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /bin/products ./apps/products/cmd/

FROM alpine:3.20

WORKDIR /app

COPY --from=builder /bin/products /app/products

EXPOSE 4030
EXPOSE 50052

CMD ["/app/products"]