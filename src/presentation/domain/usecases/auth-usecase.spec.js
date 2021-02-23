const { MissingParamError } = require("../../utils/errors")
const AuthUseCase = require('./auth-usecase')

const makeSut = () =>{
    class EncrypterSpy {
        async compare(password, hashedPassword){
            this.password = password
            this.hashedPassword = hashedPassword
        }
    }
    class LoadUserByEmailRepositorySpy {
        async load(email){
            this.email = email
            return this.user
        }
    }
    const encryterSpy = new EncrypterSpy()
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
    loadUserByEmailRepositorySpy.user = {
        password : 'hashed_password'
    }
    const sut = new AuthUseCase(loadUserByEmailRepositorySpy, encryterSpy)
    return {
        sut,
        loadUserByEmailRepositorySpy,
        encryterSpy
    }
}
describe('Auth UseCase', () =>{
    test('Should throw if no email is provided', async () =>{
        const {sut} = makeSut()
        const promisse = sut.auth()
        expect(promisse).rejects.toThrow(new MissingParamError('email'))
    })

    test('Should throw if no password is provided', async () =>{
        const {sut} = makeSut()
        const promisse = sut.auth('any_email@email.com')
        expect(promisse).rejects.toThrow(new MissingParamError('password'))
    })

    test('Should call LoadUserByEmailRepository with correct email', async () =>{
        const {sut, loadUserByEmailRepositorySpy} = makeSut()
        await sut.auth('any_email@email.com', 'any_password')
        expect(loadUserByEmailRepositorySpy.email).toBe('any_email@email.com')
    })

    test('Should throw if no LoadUserByEmailRepository is provided', async () =>{
        const sut = new AuthUseCase()
        const promisse = sut.auth('any_email@email.com', 'any_password')
        expect(promisse).rejects.toThrow()
    })

    test('Should throw if no LoadUserByEmailRepository has no load method', async () =>{
        const sut = new AuthUseCase({})
        const promisse = sut.auth('any_email@email.com', 'any_password')
        expect(promisse).rejects.toThrow()
    })

    test('Should return null if an invalid email is provided', async () =>{
        const {sut, loadUserByEmailRepositorySpy} = makeSut()
        loadUserByEmailRepositorySpy.user = null
        const accessToken = await sut.auth('invalid_email@email.com', 'any_password')
        expect(accessToken).toBeNull()
    })

    test('Should return null if an invalid password is provided', async () =>{
        const {sut} = makeSut()
        const accessToken = await sut.auth('valid_email@email.com', 'invalid_password')
        expect(accessToken).toBeNull()
    }) 
    
    test('Should call Encrypter with correct values', async () =>{
        const {sut, loadUserByEmailRepositorySpy, encryterSpy} = makeSut()
        await sut.auth('valid_email@email.com', 'any_password')
        expect(encryterSpy.password).toBe('any_password')
        expect(encryterSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password)
    })
    
})