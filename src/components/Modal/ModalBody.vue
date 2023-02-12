<script setup>
import ModalChatSectionHeader from '@/components/Modal/ModalChatSectionHeader.vue'
import ModalChatMessages from '@/components/Modal/ModalChatMessages.vue'
const props=defineProps({
  content:{
        type: Array
    }
});
</script>
<template>
    <div class="max-h-[60vh] overflow-auto">
        <ul>
            <li v-for="version in props.content" :key="version.id">
                <ModalChatSectionHeader :data="{...version}" />
                <ModalChatMessages :messages="version.messages" />
            </li> 
        </ul>
    </div>        
</template>