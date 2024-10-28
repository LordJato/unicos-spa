import can from '../helpers/can';
import { useUserStore } from '@/stores/user';

export default async function checkPermissions({ next, to, from, router }) {
  const requiredPermissions = to.meta.permissions;
  const userStore = useUserStore();

  try {
    if (!from.name) await userStore.profile();

    const canEnter = await can(requiredPermissions);

    return canEnter ? next() : router.push({ name: 'forgot-password' });
  } catch (error) {
    console.error('Error loading user profile:', error);
    return 'Error loading user profile';
  }
}