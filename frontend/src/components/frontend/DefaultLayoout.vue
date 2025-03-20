<script setup>
import Header from  "@/components/frontend/layouts/Header.vue"
import Nav from "@/components/frontend/layouts/Nav.vue";
import Footer from "@/components/frontend/layouts/Footer.vue";

</script>

<template>
    <Header />
    <Nav />
    <main>
        <slot></slot>
    </main>
    <Footer />
</template>

<style scoped>

</style>
