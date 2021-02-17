module.exports = class UnauthorizedErrorParamError extends Error{
    constructor(paramName){
        super('internal error')
        this.name = 'ServerError'
    }
}