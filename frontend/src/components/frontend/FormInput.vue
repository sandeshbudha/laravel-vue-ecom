<script setup>
defineProps({
    label:String,
    type:{
        type:String,
        default:String
    },
    modelValue:String,
    error:String,
    placeholder:String

})
const emits = defineEmits(["update:modelValue", "validate"]);

const updateValue = ((event)=>{
    emits("update:modelValue", event.target.value);
    emits("validate");
})
</script>

<template>

    <label for="email" class="text-gray-600 mb-2 block">{{label}}</label>
    <input :type="type"
           :value="modelValue"
           @input="updateValue"
           :class="[
                 'block w-full border px-4 py-3 text-gray-600 text-sm rounded focus:ring-0',
                error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'
            ]"
           :placeholder="placeholder">

    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
</template>

<style scoped>

</style>
