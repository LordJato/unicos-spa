import useAuthStore from '@/stores/auth';

export default function auth({ next, router }) {
  const authStore = useAuthStore();
  const accessToken = authStore.getAccessToken;

  if (!accessToken) {
    return router.push({ name: 'login' });
  }

  return next();
}