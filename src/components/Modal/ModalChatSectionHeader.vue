<script setup>
import { ref } from 'vue'
import IconCloudDownload from '@/components/icons/IconCloudDownload.vue'
const props=defineProps({
  data:{
        type: Object
    }
});
const dataRender=ref({...props.data});
</script>
<template>
    <div class="flex flex-row justify-between items-center mb-3 border-b border-gray-300">
        <div>
            <h4 class="font-bold text-gray-700 uppercase">
                {{ dataRender.version }}
            </h4>
            <h5 class="font-semibold text-blue-600">
                {{ dataRender.file_name }}
            </h5>
            <h5 class="font-semibold text-gray-600">
                Documento / 
                <span class="uppercase">{{ dataRender.file_type }} ({{ dataRender.file_size }})</span>
                {{ dataRender.date_time }}
            </h5>
        </div>
        <div class="mr-5">
            <IconCloudDownload :url="dataRender.file_url" />
        </div>
    </div>  
</template>