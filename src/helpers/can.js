import { useUserStore } from '@/stores/user';

export default (permissions) => {
  const userStore = useUserStore();
  const userDetails = userStore.getUserDetails;

  if (!userDetails || !permissions) return false;

  const { permissions: userPermissions, roles } = userDetails;

  return roles?.[0] === 'super-admin' ||
    (Array.isArray(permissions) ?
      permissions.some(permission => userPermissions.includes(permission)) :
      userPermissions.includes(permissions));
}