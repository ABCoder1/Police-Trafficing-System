package cybersec

import (
	"crypto/md5"
	"encoding/hex"
)

func GetHashedPwd(pwd, saltValue string) string {
	// Create hash of salt value
	hasher1 := md5.New()
	hasher1.Write([]byte(saltValue))
	saltValue = hex.EncodeToString(hasher1.Sum(nil))

	// Create hash of pwd + hash(saltValue)
	newPwd := pwd + saltValue
	hasher2 := md5.New()
	hasher2.Write([]byte(newPwd))

	return hex.EncodeToString(hasher2.Sum(nil))
}
