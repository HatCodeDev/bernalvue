import axios from "axios";
import { defineStore } from "pinia";
import { show_alerta } from "../functions";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
        authToken: null
    }),
    getters: {
        user: (state) => state.authUser,
        token: (state) => state.authToken
    },
    actions: {
        async getToken() {
            await axios.get('/sanctum/csrf-cookie');
        },
        async login(form) {
            await this.getToken();
            try {
                const res = await axios.post('/api/auth/login', form);
                this.authToken = res.data.token;
                this.authUser = res.data.data;
                this.router.push('/tostados');
            } catch (errors) {
                let desc = '';
                if (errors.response && errors.response.data.errors) {
                    errors.response.data.errors.map(e => desc += ' ' + e);
                }
                show_alerta(desc, 'error', '');
            }
        },
        async register(form) {
            await this.getToken();
            try {
                const res = await axios.post('/api/auth/register', form);
                show_alerta(res.data.message, 'success', '');
                setTimeout(() => this.router.push('/login'), 2000);
            } catch (errors) {
                let desc = '';
                if (errors.response && errors.response.data.errors) {
                    errors.response.data.errors.map(e => desc += ' ' + e);
                }
                show_alerta(desc, 'error', '');
            }
        },
        async logout() {
            try {
                await axios.get('/api/auth/logout');
                this.authToken = null;
                this.authUser = null;
                show_alerta('Sesión cerrada exitosamente', 'success', '');
                this.router.push('/login');
            } catch (error) {
                show_alerta('Error al cerrar sesión', 'error', '');
            }
        }
    },
    persist: {
        key: 'auth',
        storage: window.localStorage
    }
});
