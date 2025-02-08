import can from '@/helpers/can';
import { useUserStore } from '@/stores/useUserStore';

export default async function checkPermissions({ next, to, from, router }) {
  const requiredPermissions = to.meta.permissions;
  const userStore = useUserStore();

  try {
    if (!from.name) {
      await userStore.profile(); // Load user profile if navigating directly
    }

    const canEnter = await can(requiredPermissions);

    if (canEnter) {
      return next();
    } else {
      return router.push({ name: 'home' });
    }
  } catch (error) {
    console.error('Error loading user profile or permissions:', error);
    return router.push({ name: 'error' }); // Redirect to a generic error page
  }
}