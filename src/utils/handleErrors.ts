import { useAlertStore } from "@/stores/useAlertStore";
import { unwrapErrorResponse } from "@/utils/apiResponse";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export default function handleErrors(
  error: unknown,
  errorMessages: Record<string, string | null>
): void {
  const alertStore = useAlertStore();

  if (error instanceof AxiosError) {
    const errorResponse: ErrorResponse = unwrapErrorResponse<ErrorResponse>(error);

    alertStore.showAlert({
      text: errorResponse.message,
      type: "error",
    });

    if (errorResponse.errors && Object.keys(errorResponse.errors).length) {
      Object.keys(errorMessages).forEach((key) => {
        errorMessages[key] = errorResponse.errors?.[key]?.[0] || null;
      });
    }
  } else {
    alertStore.showAlert({
      text: "An unexpected error occurred.",
      type: "error",
    });
    console.error("Unhandled error:", error);
  }
}
