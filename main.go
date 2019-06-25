package main

import (
	"github.com/labstack/echo"
)

func main() {
	e := echo.New()
	e.File("/", "public/index.html")
	e.Static("/assets", "static")
	e.Logger.Fatal(e.Start(":8080"))
}
