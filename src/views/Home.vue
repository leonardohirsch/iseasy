<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { Modal, Toast  } from 'flowbite-vue'
import { useTasksStore } from '../stores/tasks.js'
import { useVersionsStore } from '../stores/versions.js'
import { useMessagesStore } from '../stores/messages.js'
import Card from '@/components/Card.vue'
import ModalHeader from '@/components/Modal/ModalHeader.vue'
import ModalBody from '@/components/Modal/ModalBody.vue'
import ModalFooter from '@/components/Modal/ModalFooter.vue'
import formatDate from '../helpers/formatDate.js'

/**STORES*/
const tasksStore = useTasksStore();
const versionStore = useVersionsStore();
const messagesStore = useMessagesStore();

/**variables para mostrar errores y determinar si la página se carga o no*/
const warning = ref(null);
const isLoad = ref(false);

/**variables relacionadas con el MODAL*/
const isShowModal = ref(false);//false MODAL cerrado / true MODAL abierto
const taskIdModal = ref(null);//ID del task que se visualizará en MODAL
const taskContent=ref({});//detalle del task en MODAL (incluido versiones y mensajes)
const lastMessageModalId=ref('');//DOM element ID del último mensaje, para poder hacer scroll
const versionsContent=ref([]);//array con contenido de los versiones mostradas en MODAL

function closeModal() {
  isShowModal.value = false;
  lastMessageModalId.value='';
}

function showModal(taskId) {
    taskIdModal.value=taskId;
    taskContent.value = tasksStore.getTask(taskId);
    versionsContent.value= versionStore.getVersionsByTask(taskId);
    versionsContent.value.map( item => {
        item.date_time=formatDate(item.date_time);
        item.messages=messagesStore.getMessagesByTaskVersion(taskId, item.id);
        item.messages.map( message => {
            message.date_time=formatDate(message.date_time);
            return message;
        });
        return item;
    })
    
    /**Seteamos ID del DOM element que contiene el último mensaje enviado */
    const lastMessageElem=versionsContent.value[versionsContent.value.length-1].messages[versionsContent.value[versionsContent.value.length-1].messages.length-1];
    lastMessageModalId.value=taskId+'_'+lastMessageElem.version_id+'_'+lastMessageElem.id;

    isShowModal.value = true;
}

function sendMessage({input}) {
    /**Si input del mensaje no tiene contenido no se puede enviar mensaje*/
    if (input===''){
        return;
    }

    /**Identificamos ID de la última versión y del último mensaje para crear nuevo ID message y para crear payload que se pasará a la Store */
    const lastVersionId = versionsContent.value.sort((a, b) => b.id - a.id)[0].id;
    const lastVersionIndex = versionsContent.value.findIndex( item => item.id === lastVersionId);
    const lastMessageId = versionsContent.value[lastVersionIndex].messages.sort((a, b) => b.id - a.id)[0].id;
    const newMessageId = lastMessageId + 1;

    /**Payload que se pasará a la Store */
    const payload = {
        id: newMessageId,
        task_id: taskIdModal.value,
        version_id: lastVersionId,
        sender: 0,
        date_time: Date.now(),
        message: input
    }
    
    messagesStore.addMessage(payload);

    payload.date_time = formatDate(payload.date_time);

    versionsContent.value[lastVersionIndex].messages.push(payload);

    /**Asegurarse de orden debido del array luego del push para que se muestre correctamente en MODAL */
    versionsContent.value = versionsContent.value.map( item => {
        item.messages.sort((a, b) => a.id - b.id);
        return item;
    });
    versionsContent.value = versionsContent.value.sort((a, b) => a.id - b.id);

    /**Seteamos nuevo ID del DOM element que contiene el último mensaje enviado */
    lastMessageModalId.value=taskIdModal.value+'_'+lastVersionId+'_'+newMessageId;
}

onMounted(async () => {
    /**Fetch data de las "colecciones"*/
    await tasksStore.getTasks();
    await versionStore.getVersions();
    await messagesStore.getMessages();

    if (tasksStore.warning || versionStore.warning || messagesStore.warning) warning.value='Lo siento, se produjo un error inespedado. Intente nuevamente';

    if (tasksStore.isLoad && versionStore.isLoad && messagesStore.isLoad) isLoad.value=true;
})

/** watch para hacer scroll automático al último mensaje */
watch(lastMessageModalId, () => {
    if (isShowModal.value && lastMessageModalId.value!==''){
        nextTick(() => {
          document.getElementById(lastMessageModalId.value).scrollIntoView({ behavior: 'smooth', block: 'start'});
        })
    }
});

</script>

<template>
    <!-- En caso de algún error, se muestra Toast con el warning correspondiente-->
    <Toast v-if="warning" class="fixed top-[20%] left-[10%] border-2 border-red-800" type="warning" closable>
        {{ warning }}
    </Toast>

    <h1 class="text-center underline text-blue-800 font-bold text-3xl my-5">isEasy Tablero de Tareas</h1>

    <!-- Mostramos Cards solamente si cargó toda la "base de datos" correctamente-->
    <div v-if="isLoad" class="container">
        <!-- Cards List de las Tasks -->
        <ul class="flex flex-col flex-wrap sm:flex-row gap-2 lg:gap-3 justify-center">
            <li v-for="task in tasksStore.tasksOrdered" :key="task.id">
                <Card :task="task" @do="showModal(task.id)" />
            </li>
        </ul>

        <!-- MODAL con mensajes. Componente base de la librería flowbite-vue. ModalHeader, ModalBody y ModalFooter fueron creados por mí -->
        <Modal size="5xl" v-if="isShowModal" @close="closeModal">
            <template #header>
                <ModalHeader :title="taskContent.name" />
            </template>
            <template #body>
                <ModalBody :content="versionsContent" />
            </template>
            <template #footer>
              <ModalFooter @do="sendMessage" />
            </template>
        </Modal>
    </div>
</template>