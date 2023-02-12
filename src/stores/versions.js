import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import fetchColection from '../helpers/fetchColection.js'

export const useVersionsStore = defineStore('versions', () => {
  const versions=reactive([]);
  const isLoad = ref(false);
  const warning = ref(false);

  /** función para fetch de la colección "versions" (simulación base NoSql) */
  async function getVersions() {
    if (isLoad.value===false && localStorage.getItem("isEasyTasks") && JSON.parse(localStorage.getItem("isEasyTasks")).hasOwnProperty("versions")){
        
        const dbLocalStorage=JSON.parse(localStorage.getItem("isEasyTasks"));
        const versionsLocalStorage=dbLocalStorage.versions;
        versionsLocalStorage.map(version => versions.push(version));
        isLoad.value=true;
        
      } else if (isLoad.value===false && (!localStorage.getItem("isEasyTasks") || (localStorage.getItem("isEasyTasks") && !JSON.parse(localStorage.getItem("isEasyTasks")).hasOwnProperty("versions")))){
          const response = await fetchColection('versions');
          if (!response){
            warning.value=true;
            return;
          }
          response.map(item => versions.push(item));
          isLoad.value=true;
      }
  }

  function getVersionsByTask(taskId) {
    return versions.filter( item => item.task_id === taskId).sort((a, b) => a.id - b.id );
  }


  return { versions, isLoad, warning, getVersions, getVersionsByTask }
})
