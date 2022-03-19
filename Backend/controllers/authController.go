package controllers

import (
	"Final/cybersec"
	"Final/database"
	"Final/models"
	"log"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	fiber "github.com/gofiber/fiber/v2"
)

const SecretKey = "secret"

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	hashedPassword := cybersec.GetHashedPwd(data["pwd"], data["lname"])

	// Register Driver
	if data["userType"] == "driver" {
		log.Println(data)
		driver := models.Driver{
			UID:      data["uid"],
			FNAME:    data["fname"],
			LNAME:    data["lname"],
			PASSWORD: hashedPassword,
			STATUS:   "allowed",
			CHALLANS: "none",
		}

		database.DB.Create(&driver)

		if err2 := c.JSON(driver); err2 != nil {
			return err2
		}

		return nil
	} else {
		// Register Police
		log.Println(data)
		police := models.Police{
			UID:      data["uid"],
			FNAME:    data["fname"],
			LNAME:    data["lname"],
			PASSWORD: hashedPassword,
		}

		database.DB.Create(&police)

		if err2 := c.JSON(police); err2 != nil {
			return err2
		}

		return nil
	}

}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// Login for Driver

	if data["userType"] == "driver" {
		var driver models.Driver

		database.DB.Table("drivers").Where("uid = ?", data["uid"]).First(&driver)

		// log.Println(driver)

		// log.Println(data)

		comp := models.Driver{}

		if driver == comp {
			c.Status(fiber.StatusNotFound)

			return c.JSON(fiber.Map{
				"message": "user not found",
			})

		} else {
			inputPasswordHash := cybersec.GetHashedPwd(data["pwd"], driver.LNAME)

			if inputPasswordHash != driver.PASSWORD {
				c.Status(fiber.StatusBadRequest)
				return c.JSON(fiber.Map{
					"message": "Incorrect Password",
				})
			} else {

				claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
					Issuer:    driver.UID + ":" + data["userType"],
					ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), // Add (1hrs * 24) --> 24 Hours
				})

				token, err := claims.SignedString([]byte(SecretKey))

				if err != nil {
					c.Status(fiber.StatusInternalServerError)

					return c.JSON(fiber.Map{
						"message": "Couldn't log in because of jwt token",
					})
				}

				cookie := fiber.Cookie{
					Name:     "jwt",
					Value:    token,
					Expires:  time.Now().Add(time.Hour * 24),
					HTTPOnly: true,
				}

				c.Cookie(&cookie)

				return c.JSON(fiber.Map{
					"message": "Successfully Logged In",
				})
			}

		}
	} else {
		// Login for Police

		var police models.Police

		database.DB.Table("police").Where("uid = ?", data["uid"]).First(&police)

		log.Println(police)

		log.Println(data)

		comp := models.Police{}

		if police == comp {
			c.Status(fiber.StatusNotFound)

			return c.JSON(fiber.Map{
				"message": "user not found",
			})

		} else {
			inputPasswordHash := cybersec.GetHashedPwd(data["pwd"], police.LNAME)

			if inputPasswordHash != police.PASSWORD {
				c.Status(fiber.StatusBadRequest)
				return c.JSON(fiber.Map{
					"message": "Incorrect Password",
				})
			} else {

				claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
					Issuer:    police.UID + ":" + data["userType"],
					ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), // Add (1hrs * 24) --> 24 Hours
				})

				token, err := claims.SignedString([]byte(SecretKey))

				if err != nil {
					c.Status(fiber.StatusInternalServerError)

					return c.JSON(fiber.Map{
						"message": "Couldn't log in because of jwt token",
					})
				}

				cookie := fiber.Cookie{
					Name:     "jwt",
					Value:    token,
					Expires:  time.Now().Add(time.Hour * 24),
					HTTPOnly: true,
				}

				c.Cookie(&cookie)

				return c.JSON(fiber.Map{
					"message": "Successfully Logged In",
				})
			}

		}

	}

}

func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)

		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)

	issuerSlice := strings.Split(claims.Issuer, ":")

	issuerUid := issuerSlice[0]
	log.Println(issuerUid)

	issuerUserType := issuerSlice[1]
	log.Println(issuerUserType)

	if issuerUserType == "driver" {

		var driver models.Driver

		database.DB.Where("uid = ?", issuerUid).First(&driver)

		return c.JSON(driver)

	} else {

		var police models.Police

		database.DB.Where("uid = ?", issuerUid).First(&police)

		return c.JSON(police)

	}

}

func Logout(c *fiber.Ctx) error {
	// We need to remove cookies to logout

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "Successfully Logged Out",
	})
}
