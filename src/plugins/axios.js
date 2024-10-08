import axios from 'axios'
import router from '@/router'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})

instance.interceptors.request.use(function(config){
    
    const token =  localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    if (error.response) {
        if (error.response.status === 401) {
          // Redirect to login page
          router.push('/login')
        } else {
          // Show a generic error message
          alert('An error occurred. Please try again later.')
        }
      }
      return Promise.reject(error)
})


export default instance