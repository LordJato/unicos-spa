import useAuthStore from '@/stores/auth';

export default function guest({ next, router }) {
    try {

      const authStore = useAuthStore();
      const accessToken = authStore.getAccessToken;
      if (accessToken) {
        return router.push({ name: 'dashboard' });
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // Handle the error or redirect to an error page
    }
  
    return next();
  }