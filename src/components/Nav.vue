<script setup>
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore();
</script>

<template>
<nav class="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">El Bernal</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="authStore.user">
                <li class="nav-item">
                    <RouterLink to="/tostados" class="nav-link">Tostados</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/bebidas" class="nav-link">Bebidas</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/graphic" class="nav-link">Grafica</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/reports" class="nav-link">Reportes</RouterLink>
                </li>
            </ul>
            <ul class="navbar-nav ms-auto" v-if="authStore.user">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-light" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa-solid fa-user me-2"></i> <!-- Ícono del usuario -->
                  {{ authStore.user.name }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <!-- <li><RouterLink class="dropdown-item">Perfil</RouterLink></li>
                  <li><RouterLink class="dropdown-item">Configuración</RouterLink></li> -->
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <button @click="authStore.logout" class="dropdown-item text-danger">Cerrar sesión</button>
                  </li>


                </ul>
              </li>
              <!-- <li class="nav-item">
                <button @click="$event => authStore.logout" class="btn btn-danger">Salir</button>
              </li> -->
            </ul>
        </div>
    </div>
</nav>
</template>
