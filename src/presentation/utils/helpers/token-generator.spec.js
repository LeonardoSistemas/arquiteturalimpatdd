const jwt = require('jsonwebtoken')
const { MissingParamError } = require('../errors')
class TokenGenerator {
    constructor(secret){
        this.secret = secret
    }
    async generate(id) {
        if(!this.secret){
            throw new MissingParamError('secret')
        }
        return jwt.sign(id, this.secret)
    }
}

const makeSut = () =>{
    return new TokenGenerator('secret')
}

describe('Token Generator', () => {
    test('Should return null if JWT returns null', async () => {
        const sut = makeSut()
        jwt.token = null
        const token = await sut.generate('any_id')
        expect(token).toBeNull()
    })

    test('Should return a token if JWT return token', async () => {
        const sut = makeSut()
        const token = await sut.generate('any_id')
        expect(token).toBe(jwt.token)
    })

    test('Should call JWT with correct values', async () => {
        const sut = makeSut()
        await sut.generate('any_id')
        expect(jwt.id).toBe('any_id')
        expect(jwt.secret).toBe(sut.secret)
    })

    test('Should throw if no secret is provided', async () => {
        const sut = new TokenGenerator()
        const promisse = sut.generate('any_id')
        expect(promisse).rejects.toThrow(new MissingParamError('secret'))
    })

})