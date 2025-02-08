import { NavigationGuardNext, Router } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

export default function guest({ next, router }: { next: NavigationGuardNext; router: Router }) {
  const authStore = useAuthStore();
  const accessToken: string = authStore.accessToken;

  if (accessToken) {
    return router.push({ name: 'Dashboard' });
  }

  return next();
}
