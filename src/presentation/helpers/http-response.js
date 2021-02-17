const UnauthorizedError = require('./unauthorized-error')
const serverError = require('./server-error')
module.exports = class HttpResponse{
    static badRequest(error){
        return{
            statusCode: 400,
            body: error
        }
    }

    static serverError(){
        return{
            statusCode: 500,
            body: new serverError()
        }
    }

    static unauthorizedError(){
        return{
            statusCode: 401,
            body: new UnauthorizedError()
        }
    }

    static ok(data){
        return{
            statusCode: 200,
            body: data
        }
    }
}