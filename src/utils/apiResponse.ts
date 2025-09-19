import { AxiosResponse, AxiosError } from 'axios';

export function unwrapSuccessResponse<T>(success: AxiosResponse<T>): T {
  return success.data;
}

