package main

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.CORS())
	e.File("/", "public/index.html")
	e.Static("/assets", "static")
	e.GET("/ip", getIP)
	e.GET("/ping", ping)
	e.Logger.Fatal(e.Start(":8080"))
}

func getIP(c echo.Context) error {
	return c.String(http.StatusOK, c.RealIP())
}

func ping(c echo.Context) error {
	return c.String(http.StatusOK, "Pong")
}
