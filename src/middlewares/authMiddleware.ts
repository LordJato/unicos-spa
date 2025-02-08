import { NavigationGuardNext, Router } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

export default function auth({ next, router }: { next: NavigationGuardNext; router: Router }) {
  const authStore = useAuthStore();
  const accessToken: string = authStore.accessToken;

  if (!accessToken) {
    return router.push({ name: 'Login' });
  }

  return next();
}
