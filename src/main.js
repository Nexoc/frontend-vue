
import store from './store'
import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

import '@fortawesome/fontawesome-free/js/all'


axios.defaults.baseURL = 'http://localhost:8001'

// axios.defaults.baseURL = 'http://localhost:8001/api/v1'

// REFRESH TOKEN
async function refreshToken() {
    const refreshToken= localStorage.getItem('refresh_token');

    try {
        const responce = await axios.post('/api/v1/auth/refresh', {
            token: refreshToken
        });
        // TODO new refresh token !!!
        const newTokens = {
            'newAccessToken' : responce.data.accessToken,
            'newRefreshToken' : responce.data.refreshToken
        }
        return newTokens;
    } catch (error) {
        console.error('Unable to refresh token', error);
        throw error;
    }
}

// request interceptor
axios.interceptors.request.use(
    async config => {

        if (!config.headers.skipAuthorization) {
            const accessToken = localStorage.getItem('access_token');
        if(accessToken) {            
            config.headers['Authorization'] = `Bearer ${accessToken}`;         
        }
    }
        // Remove the custom flag before sending the request
        delete config.headers.skipAuthorization;
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// response interceptor
axios.interceptors.response.use(
    responce => {
        return responce;
    },
    async error =>
     {
        const originalRequest = error.config;

        if (error.responce.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newTokens = await refreshToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${newTokens.newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newTokens.newAccessToken}`;
                localStorage.setItem("access_token", newTokens.newAccessToken)
                localStorage.setItem("refresh_token", newTokens.newRefreshToken)
                // localStorage.setItem("username", newTokens.newUsername) 

                return axios(originalRequest);
                
            } catch(err) {
                // error by refresh token
                console.log('Token refresh failed', err);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);


const app = createApp(App);


app.config.devtools = true;
app.config.globalProperties.$axios = axios;

// create selectable style for dynamic css variables
app.component("v-style", {
  render () { return h("style", {}, this.$slots.default()); }
});



app.use(store).use(router).use(Vuex).mount('#app')
