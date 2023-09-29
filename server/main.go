package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Carrara1/go-react-todoapp/router"
)

func main() {
	r := router.Router()
	fmt.Println("Starting Todo server on port 9000!")

	log.Fatal(http.ListenAndServe(":9000", r))
}
