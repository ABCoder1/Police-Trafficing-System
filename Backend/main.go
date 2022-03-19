package main

import (
	"Final/database"

	"Final/routes"

	fiber "github.com/gofiber/fiber/v2"

	cors "github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{ // cors -> Problem that the backend will run on different port and frontend on other port
		AllowCredentials: true, // With this the frontend can get the cookie that we sent and it can send it back
	}))
	routes.Setup(app)

	app.Listen(":8000")
}
