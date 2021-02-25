const bcrypt = require('bcryptjs')
const { MissingParamError } = require('../errors')

module.exports = class Encrypter{
    async compare(value, hash){
        if(!value){
            throw new MissingParamError('value')
        }
        if(!hash){
            throw new MissingParamError('hash')
        }
        const isValid = bcrypt.compare(value, hash)
        return isValid
    }
}