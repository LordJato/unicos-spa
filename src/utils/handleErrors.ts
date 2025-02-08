import { useAlertNotificationStore } from "@/stores/useAlertStore";
import { unwrapErrorResponse } from "@/utils/apiResponse";

interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export default function handleErrors(
  error: unknown,
  errorMessages: Record<string, string | null>
): void {
  const alertStore = useAlertNotificationStore();
  const errorResponse: ErrorResponse = unwrapErrorResponse(error);

  alertStore.showAlert({
    text: errorResponse.message,
    type: "error",
  });

  if (errorResponse.errors && Object.keys(errorResponse.errors).length) {
    Object.keys(errorMessages).forEach((key) => {
      errorMessages[key] = errorResponse.errors?.[key]?.[0] || null;
    });
  }
}
