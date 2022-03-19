package models

// This is to create a table with the following columns

type Driver struct {
	UID      string `gorm:"unique"`
	FNAME    string
	LNAME    string
	PASSWORD string `json:"-"`
	STATUS   string `json:"-"`
	CHALLANS string `json:"-"`
}
