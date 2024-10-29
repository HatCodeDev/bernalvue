<script setup>
import { ref, onMounted } from 'vue';
import {useRoute} from 'vue-router'
import { sendRequest } from '../../functions';
import { useAuthStore } from '../../stores/auth';
import {useRouter} from 'vue-router'

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;
const form = ref({ id:'',name: '' });
const id = ref(route.params.id);
onMounted(() => {getTostados()});
const getTostados = () =>{
    axios.get('api/tostados/' + id.value).then(
        response => (form.value.name = response.data.data.name)
    )
}
const save = () => {
  sendRequest('PUT', form.value, '/api/tostados/'+id.value, '/tostados');
}
</script>
<template>
    <div class="row mt-5">
        <div class="col-md-12 ">
            <div class="card login-card border rounded-0 shadow-lg">
                <div class="row g-0">
                  <div class="col-md-12">
                    <div class="card-header rounded-0 text-center bg-dark text-white">
                      <h5 class="mb-0">Nuevo Tostado</h5>
                    </div>
                    <div class="card-body p-4">
                      <form @submit.prevent="save">
                        <div class="input-group mb-3">
                          <span class="input-group-text bg-dark text-white">
                            <i class="fa-solid fa-mug-hot"></i>
                          </span>
                          <input autofocus type="text" v-model="form.name" placeholder="Tipo de tostado" class="form-control" required>
                        </div>
                    
                        <div class="d-grid col-12 mb-3">
                            <button class="btn btn-dark ">
                              <i class="fa-solid fa-save"></i> Save</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>
