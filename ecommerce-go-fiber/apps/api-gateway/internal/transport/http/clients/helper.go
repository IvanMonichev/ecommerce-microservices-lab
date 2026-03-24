package clients

import (
	"bytes"
	"errors"
	"syscall"
)

func bytesReader(data []byte) *bytes.Reader {
	return bytes.NewReader(data)
}

func isRetryableDialError(err error) bool {
	return errors.Is(err, syscall.EADDRNOTAVAIL) ||
		errors.Is(err, syscall.ECONNRESET) ||
		errors.Is(err, syscall.ECONNREFUSED)
}
