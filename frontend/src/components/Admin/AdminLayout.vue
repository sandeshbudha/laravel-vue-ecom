<template>
    <div class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <Sidebar @toggle-sidebar="toggleSidebar" :isSidebarOpen="isSidebarOpen" ></Sidebar>
        <!-- Main Content -->
        <div class="flex-1 lg:ml-64 p-6">
            <!-- Top Navbar -->
            <Navbar @toggle-sidebar="toggleSidebar" @toggle-userProfie = "toggleDropdown" :isDropdownOpen="isDropdownOpen"></Navbar>
            <!-- Dashboard Content -->
            <main class="p-6">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useStore } from "vuex";
import { toast } from "vue3-toastify";
import Sidebar from "@/components/Admin/Layout/Sidebar.vue";
import Navbar from "@/components/Admin/Layout/Navbar.vue";

const isSidebarOpen = ref(true);
const isDropdownOpen = ref(false);

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

const toggleDropdown = () => {

    isDropdownOpen.value = !isDropdownOpen.value;
};

const store = useStore();
const successMessage = computed(() => store.state.successMessage);

watch(successMessage, (message) => {
    if (message) {
        toast.success(message);
    }
});
</script>

<style scoped>
/**** Custom Styles ****/
</style>
