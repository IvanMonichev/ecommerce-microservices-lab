FROM golang:1.26.1-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /bin/api-gateway ./services/api-gateway/cmd

FROM alpine:3.20

WORKDIR /app

COPY --from=builder /bin/api-gateway /app/api-gateway

EXPOSE 4000

CMD ["/app/api-gateway"]