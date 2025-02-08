import useAuthStore from '@/stores/useAuthStore';

export default function guest({ next, router }) {
  const authStore = useAuthStore();
  const accessToken = authStore.getAccessToken;

  if (accessToken) {
    return router.push({ name: 'dashboard' });
  }

  return next();
}