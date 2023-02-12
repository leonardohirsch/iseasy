import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import fetchColection from '../helpers/fetchColection.js'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = reactive([]);
  const tasksOrdered = computed(() => tasks.sort((a, b) => a.id - b.id ));
  const isLoad = ref(false);
  const warning = ref(false);

  /** función para fetch de la colección "tasks" (simulación base NoSql) */
  async function getTasks() {

     /** Empleamos localStorage para simular Base de datos y mantener state en caso de refresh o acceso a la app en otro momento */
    if (isLoad.value===false && localStorage.getItem("isEasyTasks")){

      const tasksLocalStorage=JSON.parse(localStorage.getItem("isEasyTasks")).tasks;
      tasksLocalStorage.map(task => tasks.push(task));
      isLoad.value=true;
      
    } else if (isLoad.value===false && !localStorage.getItem("isEasyTasks")){
        /** Primer acceso simulamos fetch a una Api para descargar "colección"*/
        const response = await fetchColection('tasks');
        if (!response){
          warning.value=true;
          return;
        }
        response.map(item => tasks.push(item));
        isLoad.value=true;
    }
  }

  /** Función para cuando se abre modal en Home*/
  function getTask(taskId) {
    return tasks.filter( item => item.id === taskId)[0];
  }

  return { tasks, isLoad, warning, tasksOrdered, getTasks, getTask }
})
