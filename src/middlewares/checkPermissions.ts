import can from '@/helpers/can';
import { useUserStore } from '@/stores/useUserStore';
import { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';

interface RouteMetaWithPermissions extends RouteLocationNormalized {
  meta: {
    permissions?: string | string[];
  };
}

export default async function checkPermissions({
  next,
  to,
  from,
  router,
}: {
  next: NavigationGuardNext;
  to: RouteMetaWithPermissions;
  from: RouteLocationNormalized;
  router: Router;
}): Promise<void> {
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
      await router.push({ name: 'home' }); // Added `await` to handle return type
    }
  } catch (error) {
    console.error('Error loading user profile or permissions:', error);
    await router.push({ name: 'error' }); // Added `await` to handle return type
  }
}
