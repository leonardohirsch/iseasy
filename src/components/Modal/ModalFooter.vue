<script setup>
import { ref } from 'vue'
import IconSend from '@/components/icons/IconSend.vue'
const input=ref('');
const emit=defineEmits(["do"]);
function cleanInput() {
    if (input.value!='') input.value='';
}
</script>
<template>
    <div class="flex justify-between gap-3 flex-wrap items-center">
        <input type="text" v-model="input" class="grow rounded-full bg-gray-100">
        <a @click="$emit('do',{input}), cleanInput()" :class="{'pointer-events-none':input==''}" class="hover:cursor-pointer"><IconSend /></a>
    </div>
</template>