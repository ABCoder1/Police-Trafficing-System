package models

// This is to create a table with the following columns

type Police struct {
	UID      string `gorm:"unique"`
	FNAME    string
	LNAME    string
	PASSWORD string `json:"-"`
}
