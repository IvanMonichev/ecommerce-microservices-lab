FROM golang:1.26.1-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /bin/orders ./services/orders/cmd

FROM alpine:3.20

WORKDIR /app

COPY --from=builder /bin/orders /app/orders

EXPOSE 4020

CMD ["/app/orders"]