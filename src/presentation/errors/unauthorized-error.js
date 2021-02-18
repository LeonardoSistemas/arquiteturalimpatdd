module.exports = class UnauthorizedErrorParamError extends Error{
    constructor(paramName){
        super('unauthorized')
        this.name = 'unauthorizedError'
    }
}