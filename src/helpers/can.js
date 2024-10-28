import { useUserStore } from '@/stores/user';

export default async (permissions) => {
    const userStore = useUserStore();
   
    if (!userStore.userDetails) {
        try {
            await userStore.profile();
        } catch (error) {
            console.error("Error loading user profile:", error);
            return "Error loading user profile";
        }
    }

    const userDetails = userStore.getUserDetails;

    if (!userDetails || !permissions) return false;

    const { permissions: userPermissions, roles } = userDetails;

    return roles?.[0] === 'super-admin' ||
    (Array.isArray(permissions) ?
      permissions.some(permission => userPermissions?.includes(permission)) :
      userPermissions?.includes(permissions));
};