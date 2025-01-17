import { useAlertNotificationStore } from "@/stores/alertNotification";
import { unwrapResponse } from "@/utils/api";

const alertStore = useAlertNotificationStore();

export default function handleErrors(error, errorMessages) {
  const errorResponse = unwrapResponse(error);

  alertStore.showAlert({
    text: errorResponse.message,
    type: "error",
  });

  if (errorResponse.errors && Object.keys(errorResponse.errors).length) {
    Object.keys(errorMessages).forEach((key) => {
      errorMessages[key] = errorResponse.errors[key] || null;
    });
  }
}
