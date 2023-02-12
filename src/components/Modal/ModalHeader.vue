<script setup>
const props=defineProps({
    title:{
        type: String
    }
});
</script>
<template>
    <div class="flex items-center text-lg">
        Comentarios para {{ props.title }}
    </div>
</template>