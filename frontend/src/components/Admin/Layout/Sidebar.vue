<script setup>
const emit = defineEmits(['toggle-sidebar'])

defineProps({
    isSidebarOpen:Boolean
});

</script>

<template>
    <div :class="{'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen}"
         class="lg:translate-x-0 transform lg:block lg:w-64 bg-gray-800 text-white p-4 fixed inset-y-0 left-0 transition-transform duration-300 ease-in-out">
        <div class="flex items-center justify-between">
            <h2 class="text-2xl font-semibold">Dashboard</h2>
            <button @click="emit('toggle-sidebar')" class="lg:hidden text-gray-700 flex items-center justify-center w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

        </div>
        <ul class="mt-6 space-y-4">
            <li><router-link :to="{name:'admin.dashboard'}" class="block px-4 py-2 hover:bg-gray-700 rounded">Dashboard</router-link></li>
            <li><router-link :to="{name:'admin.products'}" class="block px-4 py-2 hover:bg-gray-700 rounded">Products</router-link></li>
            <li><a href="#" class="block px-4 py-2 hover:bg-gray-700 rounded">Profile</a></li>
            <li><a href="#" class="block px-4 py-2 hover:bg-gray-700 rounded">Logout</a></li>
        </ul>
    </div>
</template>

<style scoped>

</style>
