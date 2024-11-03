export default function auth({ next, router }) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      if (!accessToken) {
        return router.push({ name: 'login' });
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // Handle the error or redirect to an error page
    }
  
    return next();
  }