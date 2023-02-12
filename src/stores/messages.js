import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import fetchColection from '../helpers/fetchColection.js'

export const useMessagesStore = defineStore('messages', () => {
  const messages = reactive([]);
  const isLoad = ref(false);
  const warning = ref(false);

  /** función para fetch de la colección "mensajes" (simulación base NoSql) */
  async function getMessages() {
    if (isLoad.value===false && localStorage.getItem("isEasyTasks") && JSON.parse(localStorage.getItem("isEasyTasks")).hasOwnProperty("messages")){

      const dbLocalStorage=JSON.parse(localStorage.getItem("isEasyTasks"));
      const messagesLocalStorage=dbLocalStorage.messages;
      messagesLocalStorage.map(message => messages.push(message));
      isLoad.value=true;
    
    } else if (isLoad.value===false && (!localStorage.getItem("isEasyTasks") || (localStorage.getItem("isEasyTasks") && !JSON.parse(localStorage.getItem("isEasyTasks")).hasOwnProperty("messages")))){

        const response = await fetchColection('messages');
        if (!response){
          warning.value=true;
          return;
        }
        response.map(item => messages.push(item));
        isLoad.value=true;

    }
  }

  function getMessagesByTaskVersion(taskId, versionId) {
    return messages.filter( item => item.task_id === taskId && item.version_id === versionId).sort((a, b) => a.date_time - b.date_time );
  }

  function addMessage(payload) {
    const tempArr = [...messages]; 
    tempArr.push(payload);

    try {
      if (!localStorage.getItem("isEasyTasks")){
        throw new Error('Se produjo un error con LocalStorage!');
      }

      /** Update LOCALSTORAGE */
      const dbLocalStorage=JSON.parse(localStorage.getItem("isEasyTasks"));
      dbLocalStorage.messages = tempArr;
      localStorage.setItem("isEasyTasks", JSON.stringify(dbLocalStorage));

      /** Update STORE */
      messages.push({...payload});

    } catch (error) {
      /** En caso de algún error, nos aseguramos de eliminar el item tanto en STORE como en LocalStorage */

      let removeIndex = messages.findIndex( item => item.id === payload.id && item.task_id === payload.task_id && item.version_id === payload.version_id);
      if (removeIndex !==-1) messages.splice(removeIndex, 1);

      if (localStorage.getItem("isEasyTasks") && JSON.parse(localStorage.getItem("isEasyTasks")).hasOwnProperty("messages")){

        const dbLocalStorage=JSON.parse(localStorage.getItem("isEasyTasks"));
        removeIndex = dbLocalStorage.messages.findIndex( item => item.id === payload.id && item.task_id === payload.task_id && item.version_id === payload.version_id);
        if (removeIndex !==-1) {
          dbLocalStorage.messages.splice(removeIndex, 1);
          localStorage.setItem("isEasyTasks", JSON.stringify(dbLocalStorage));
        }
      }

      console.log(error);
      warning.value=true;
    } finally{
      //vaciar tempArr
      tempArr.length = 0;
    }
  }

  return { messages, isLoad, warning, getMessages, getMessagesByTaskVersion, addMessage }
})
