import { useUserStore } from '@/stores/user'

export default (permissions) => {
    const userPermissions = useUserStore.getUserDetails.permissions;
    let canEnter = false;

    console.log({userPermissions});

    if (!userPermissions || !permissions) {
        return canEnter;
    }

    if (!Array.isArray(permissions)) {
        canEnter = userPermissions.includes(permissions)
    } else {
        permissions.forEach((permission) => {
            if (userPermissions.includes(permission)) {
                canEnter = true;
            }
        });
    }

    return canEnter
};