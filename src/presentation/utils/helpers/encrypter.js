const bcrypt = require('bcryptjs')

module.exports = class Encrypter{
    async compare(value, hash){
        const isValid = bcrypt.compare(value, hash)
        return isValid
    }
}