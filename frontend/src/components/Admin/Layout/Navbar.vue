<script setup>
import store from "@/store/index.js";
import router from "@/router/index.js";
import {toast} from "vue3-toastify";

const emit  = defineEmits(['toggle-sidebar','toggle-userProfie'])

defineProps({
    isDropdownOpen:Boolean
});

function logout(){
    store.dispatch('logout')
        .then(()=>{
        router.push({name:"login"})
    })
        .catch(({response})=>{
            toast.error(response.data.message)
        })
}
</script>

<template>
    <div class="flex justify-between items-center bg-white p-4 shadow-md">
        <button @click="emit('toggle-sidebar')" class="lg:hidden text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

        <div></div> <!-- Empty div to push profile icon to the right -->

        <!-- Profile Dropdown -->
        <div class="relative">
            <button @click="emit('toggle-userProfie')" class="flex items-center space-x-2 focus:outline-none cursor-pointer">
                <img src="https://via.placeholder.com/40" class="w-10 h-10 rounded-full" alt="Profile">
            </button>

            <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-40 bg-white  rounded shadow-md text-sm">
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
                <a href="#" type="button" @click="logout" class="block px-4 py-2 hover:bg-gray-100">Logout</a>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
