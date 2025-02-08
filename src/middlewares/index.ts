import auth from "./authMiddleware";
import checkPermissions from "./checkPermissions";
import guest from "./guestMiddleware";

export default {
    auth,
    guest,
    checkPermissions
}