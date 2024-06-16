function AppResponse(message: string, statusCode: number = 400, data: any = []) {
    const error = statusCode < 200 || statusCode > 300;

    return {
        error,
        message,
        data,
        statusCode
    }
}


export {
    AppResponse
}