import { AxiosResponse, AxiosError } from 'axios';

export function unwrapSuccessResponse<T>(success: AxiosResponse<T>): T {
  return success.data;
}

export function unwrapErrorResponse<T = unknown>(error: AxiosError<T>): T {
  return error.response?.data as T;
}
