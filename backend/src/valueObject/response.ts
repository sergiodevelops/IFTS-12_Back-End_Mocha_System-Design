export function successResponse(data: object | object[]) {
    return {
        "data": data,
    };
}

export function errorResponse(status: number, errors: Error) {
    return {
        "errors": {
            "status": status,
            "title": "An error occurred",
            "details": errors.message,
        }
    }
}
