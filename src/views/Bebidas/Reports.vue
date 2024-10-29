<script setup>
import '@/assets/style.css';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';
import SelectInput from '../../components/SelectInput.vue';
import DataTable from 'datatables.net-vue3';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-responsive-dt';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import JSZip from 'jszip';
import pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';

window.JSZip = JSZip;
DataTable.use(ButtonsHtml5);


const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;
const tostados = ref([]);
const bebidas = ref([]);
const columns1 = ref([]);
const columns2 = ref([]);
const buttons1 = ref([]);
const buttons2 = ref([]);
const report = ref('1');
const types = ref([
  { 'id': '1', 'name': 'Bebidas' },
  { 'id': '2', 'name': 'Tostados' }
]);

onMounted(async () => {
  const d = await axios.get('/api/tostados');
  tostados.value = d.data; // Ahora se usa para "tostados"
  
  const e = await axios.get('/api/bebidasall');
  bebidas.value = e.data; // Ahora se usa para "bebidas"
});

columns1.value = [
  { data: null, render: function(data, type, row, meta) {
      return (meta.row + 1);
    }
  },
  { data: 'tipo' },
  { data: 'tostado' },
  { data: 'precio' },
  { data: 'filtracion' },
  { data: 'altura' },
  { data: 'complementos' }
];

columns2.value = [
  { data: null, render: function(data, type, row, meta) {
      return (meta.row + 1);
    }
  },
  { data: 'name' } // Para los tostados, utilizamos 'name' ya que representa el nombre del tostado
];
buttons1.value = [
  {
    title: 'Bebidas',
    extend: 'excelHtml5',
    text: '<i class="fa-solid fa-file-excel"></i> Excel',
    className: 'btn btn-success'
  },
  {
    title: 'Bebidas',
    extend: 'pdfHtml5',
    text: '<i class="fa-solid fa-file-pdf"></i> PDF',
    className: 'btn btn-danger'
  },
  {
    title: 'Bebidas',
    extend: 'print',
    text: '<i class="fa-solid fa-print"></i> PRINT',
    className: 'btn btn-dark'
  },
  {
    title: 'Bebidas',
    extend: 'copy',
    text: '<i class="fa-solid fa-copy"></i> COPY',
    className: 'btn btn-secondary'
  }
];

buttons2.value = [
  {
    title: 'Tostados',
    extend: 'excelHtml5',
    text: '<i class="fa-solid fa-file-excel"></i> Excel',
    className: 'btn btn-success'
  },
  {
    title: 'Tostados',
    extend: 'pdfHtml5',
    text: '<i class="fa-solid fa-file-pdf"></i> PDF',
    className: 'btn btn-danger'
  },
  {
    title: 'Tostados',
    extend: 'print',
    text: '<i class="fa-solid fa-print"></i> PRINT',
    className: 'btn btn-dark'
  },
  {
    title: 'Tostados',
    extend: 'copy',
    text: '<i class="fa-solid fa-copy"></i> COPY',
    className: 'btn btn-secondary'
  }
];


</script>
<template>
    <div class="row mb-5">
  <div class="col-md-8 offset-md-2">
    Reporte:
    <SelectInput id="rep" class="mt-1" v-model="report" :options="types"></SelectInput>
  </div>
</div>

<div class="row" v-if="report == '1'">
  <div class="col-md-8 offset-md-2">
    <div class="table-responsive">
        <DataTable 
            :data="bebidas" 
            :columns="columns1" 
            class="table table-striped" 
            :options="{ responsive: true, autoWidth: false, dom: 'Bfrtip', buttons: buttons1 }"
        >
            <thead>
              <tr>
                <th>#</th>
                <th>Tipo</th>
                <th>Tostado</th>
                <th>Precio</th>
                <th>Filtración</th>
                <th>Altura</th>
                <th>Complementos</th>
              </tr>
            </thead>
        </DataTable>
    </div>
  </div>
</div>

<div class="row" v-else>
  <div class="col-md-8 offset-md-2">
    <div class="table-responsive">
        <DataTable 
            :data="tostados" 
            :columns="columns2" 
            class="table table-striped" 
            :options="{ responsive: true, autoWidth: false, dom: 'Bfrtip', buttons: buttons2 }"
        >
            <thead>
              <tr>
                <th>#</th>
                <th>Tostado</th>
              </tr>
            </thead>
        </DataTable>
    </div>
  </div>
</div>

</template>
