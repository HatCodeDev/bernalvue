<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
const form = ref({name:'', email: '', password: '' });

import '@/assets/style.css';
import loginImage from '@/assets/login.jpg';
</script>
<template>
    <div class="row mt-5">
        <div class="col-md-12 ">
            <div class="card login-card border rounded-0 shadow-lg">
                <div class="row g-0">
                  <div class="col-md-5">
                    <img :src="loginImage" class="img-fluid h-100" alt="Login Image">
                  </div>
                  <div class="col-md-7">
                    <div class="card-header rounded-0 text-center bg-dark text-white">
                      <h5 class="mb-0">Register</h5>
                    </div>
                    <div class="card-body p-4">
                      <form @submit.prevent="$event => authStore.register(form)">
                        <div class="input-group mb-3">
                          <span class="input-group-text bg-dark text-white">
                            <i class="fa-solid fa-user"></i>
                          </span>
                          <input autofocus type="text" v-model="form.name" placeholder="Name" class="form-control" required>
                        </div>

                        <div class="input-group mb-3">
                          <span class="input-group-text bg-dark text-white">
                            <i class="fa-solid fa-at"></i>
                          </span>
                          <input autofocus type="email" v-model="form.email" placeholder="Email" class="form-control" required>
                        </div>
                    
                        <div class="input-group mb-3">
                          <span class="input-group-text bg-dark text-white">
                            <i class="fa-solid fa-key"></i>
                          </span>
                          <input type="password" v-model="form.password" placeholder="Password" class="form-control" required>
                        </div>
                    
                        <div class="d-grid col-12 mb-3">
                          <button class="btn btn-dark btn-block">Registrar</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>
