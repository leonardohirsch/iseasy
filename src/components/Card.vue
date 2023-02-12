<script setup>
import { TheCard  } from 'flowbite-vue'
const props=defineProps({
  task:{
        type: Object
    }
});
const emit=defineEmits(["do"]);
</script>
<template>
    <the-card>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ props.task.name }}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
            {{ props.task.description }}
        </p>
        <button @click="$emit('do')" type="button" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Ver mensajes
        </button>
    </the-card>
</template>