<script setup>
const props=defineProps({
  messages:{
        type: Array
    }
});
</script>
<template>
    <div>
        <ul>
            <li v-for="message in props.messages" :key="message.id" class="flex flex-col m-3">
                <div :id="`${message.task_id}_${message.version_id}_${message.id}`" class="flex flex-row" :class="{ 'self-end': message.sender==1, 'flex-row-reverse': message.sender==1}">
                    <img :src="`img/avatar_${message.sender}.png`" class="rounded-full w-[35px] h-[35px] self-center"> 
                    <div class="mx-3 my4 max-w-[70%] p-2 text-sm" :class="{ 'self-end': message.sender==1, 'text-white': message.sender==1, 'bg-gray-100': message.sender==0, 'bg-blue-600': message.sender==1, 'speech-bubble-right': message.sender==0, 'speech-bubble-left': message.sender==1}" style="position:relative" >
                    {{ message.message }}
                    <span class="block mt-1 text-xs">{{ message.date_time }}</span>
                </div>
                </div>                        
            </li>
        </ul>
        <hr class="my-3 border-b-2 border-gray-400">
    </div>   
</template>

<style scoped>
/** agregamos CSS para dar forma a la burbuja de los mensajes en el MODAL */
.speech-bubble-right:after {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 0.688em solid transparent;
	border-right-color: #f3f4f6;
	border-left: 0;
	margin-top: -0.687em;
	margin-left: -0.687em;
}
.speech-bubble-left:after {
	content: '';
	position: absolute;
	right: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 0.688em solid transparent;
	border-left-color: #2563eb;
	border-right: 0;
	margin-top: -0.687em;
	margin-right: -0.687em;
}
</style>