<script setup>
import axios from 'axios';
import { ref, onMounted, nextTick } from 'vue';
import { confirmation, sendRequest} from '../../functions';
import { useAuthStore } from '../../stores/auth';
import Modal from '../../components/Modal.vue';
import SelectInput from '../../components/SelectInput.vue';
import Paginate from 'vuejs-paginate-next';
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.imagen = file;
  }
};

onMounted(() => { getTostados() , getBebidas(1)});
const tostados = ref([]);
const bebidas = ref([])
const load = ref(false);
const rows = ref(0);
const form = ref({
  tipo: '',
  tostados_id: '',
  precio: '',
  filtracion: '',
  altura: '',
  complementos: '',
  imagen: ''
}); 
const title = ref('');
const nameInput = ref(null);
const operation = ref(1);
const id = ref('');
const close = ref([]);

const getTostados = async () => {
  await axios.get('/api/tostados').then(
    response => (tostados.value = response.data)
  );
  load.value = true;
}
const getBebidas = async (page) => {
  await axios.get('/api/bebidas?page=' + page).then(
  response => (
    bebidas.value = response.data,
    rows.value = response.data.last_page
    ));
  load.value = true;
}

const deleteBebida = (id,name) =>{
    confirmation(name,('/api/bebidas/'+id),'/bebidas');
}
const openModal = (op, tipo, tostados_id, precio, filtracion, altura, complementos, imagen, bebida) => {
  clear();
  setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
  operation.value = op;
  id.value = bebida;
  if (op == 1) {
    title.value = 'Create bebida';
  } else {
    title.value = 'Update bebida';
    form.value.tipo = tipo;
    form.value.tostados_id = tostados_id;
    form.value.precio = precio;
    form.value.filtracion = filtracion;
    form.value.altura = altura;
    form.value.complementos = complementos;
    form.value.imagen = imagen;
  }
};
const clear = () => {
  form.value.tipo = '';
  form.value.tostados_id = '';
  form.value.precio = '';
  form.value.filtracion = '';
  form.value.altura = '';
  form.value.complementos = '';
  form.value.imagen = '';
};

const save = async () => {
  let formData = new FormData();
  formData.append('tipo', form.value.tipo);
  formData.append('tostados_id', form.value.tostados_id);
  formData.append('precio', form.value.precio);
  formData.append('filtracion', form.value.filtracion);
  formData.append('altura', form.value.altura);
  formData.append('complementos', form.value.complementos);
  
  if (form.value.imagen instanceof File) {
    formData.append('imagen', form.value.imagen);
  }

  // Aquí agregamos el campo _method para que Laravel lo interprete como PUT
  if (operation.value !== 1) {
    formData.append('_method', 'PUT');
  }

  let res;
  if (operation.value === 1) {
    // Crear una nueva bebida
    res = await sendRequest('POST', formData, '/api/bebidas', '', true);
  } else {
    // Actualizar una bebida existente
    res = await sendRequest('POST', formData, `/api/bebidas/${id.value}`, '', true);
  }

  if (res) {
    clear();
    nextTick(() => nameInput.value.focus());
    getBebidas(1);
  }
};




</script>
<template>
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <div class="d-grid col-10 mx-auto">
          <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modal" @click="$event => openModal(1)">
            <i class="fa-solid fa-circle-plus"></i> Add
          </button>
        </div>
      </div>
    </div>

    <div class="row mt-3">
        <div class="col-md-10 offset-md-1">
          <div class="card border border-white text-center" v-if="!load">
            <div class="card-body">
              <img src="/loader.gif" class="img-fluid">
            </div>
          </div>
          <div class="table-responsive" v-else>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                      <th>#</th>
                      <th>Tipo</th>
                      <th>Tostado</th>
                      <th>Precio</th>
                      <th>Filtración</th>
                      <th>Altura</th>
                      <th>Complementos</th>
                      <th>Imagen</th>
                      <th></th>
                      <th></th>
                    </tr>
                </thead>

                <tbody class="table-group-divider">
                <tr v-for="(bebida, i) in bebidas.data" :key="bebida.id">
                    <td>{{ i + 1 }}</td>
                    <td>{{ bebida.tipo }}</td>
                    <td>{{ bebida.tostado }}</td>
                    <td>{{ bebida.precio }}</td>
                    <td>{{ bebida.filtracion }}</td>
                    <td>{{ bebida.altura }}</td>
                    <td>{{ bebida.complementos }}</td>
                    <td>
                        <img :src="`https://apibernal.istigen23.com/storage/${bebida.imagen}`" alt="Imagen de bebida" width="50" />
                        <!-- <img :src="`/storage/${bebida.imagen}`" alt="Imagen de bebida" width="50" /> -->
                    </td>
                    <td>
                        <button class="btn btn-warning" data-bs-toggle="modal"
                            data-bs-target="#modal"
                            @click="$event => openModal(2, bebida.tipo, 
                            bebida.tostados_id, bebida.precio, bebida.filtracion, 
                            bebida.altura, bebida.complementos, bebida.imagen, 
                            bebida.id)">
                            <i class="fa-solid fa-edit"></i>
                        </button>
                    </td>
                    <td>
                      <button class="btn btn-danger" 
                        @click="$event => deleteBebida(bebida.id, bebida.tipo)">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                </tr>
              </tbody>
            </table>
            <Paginate :page-count="rows" 
            :click-handler="getBebidas" 
            :prev-text="'Prev'" 
            :next-text="'Next'" 
            :container-class="'pagination'"
            >
            </Paginate>
          </div>
        </div>
    </div>
    <Modal :id="'modal'" :title="title">
        <div class="modal-body">
            <form @submit.prevent="save">
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-mug-hot"></i>
                  </span>
                  <input autofocus type="text" v-model="form.tipo" 
                    placeholder="Tipo" class="form-control" 
                    required ref="nameInput" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">
                      <i class="fa-solid fa-coffee"></i>
                    </span>
                    <SelectInput v-model="form.tostados_id" 
                    :options="tostados" class="form-select" required></SelectInput>
                </div>

                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-dollar-sign"></i>
                  </span>
                  <input type="number" v-model="form.precio" 
                    placeholder="Precio" class="form-control" 
                    required min="0" step="0.01" />
                </div>

                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-filter"></i>
                  </span>
                  <input type="text" v-model="form.filtracion" 
                    placeholder="Filtración" class="form-control" 
                    required />
                </div>
            
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                  </span>
                  <input type="text" v-model="form.altura" 
                    placeholder="Altura" class="form-control" 
                    required />
                </div>

                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-cookie"></i>
                  </span>
                  <input type="text" v-model="form.complementos" 
                    placeholder="Complementos" class="form-control" 
                    required />
                </div>
            
                <div class="input-group mb-3">
                    <span class="input-group-text">
                      <i class="fa-solid fa-image"></i>
                    </span>
                    <input type="file" @change="onFileChange" class="form-control" accept="image/*" />
                </div>

                <div class="d-grid col-12 mb-3">
                    <button class="btn btn-dark "><i class="fa-solid fa-save"></i> Save</button>
                </div>
            </form>
        </div>
        <!-- <div class="modal-footer">
            <button class="btn btn-dark" ref="close" data-bs-dismiss="modal">close</button>
        </div> -->

    </Modal>
</template>
