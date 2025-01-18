export function unwrapSuccessResponse(success) {
    return success.data;
}

export function unwrapErrorResponse(error) {
    return error.response.data;
}