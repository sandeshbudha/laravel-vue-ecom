<script setup>
import store from "../../../store/index.js";
import {ref} from "vue";

const isCartOpen = ref(false);

const toggleCart = (()=>{
    isCartOpen.value =!isCartOpen.value
})

const removeFromCart = ((itemId)=>{
    store.dispatch("removeFromCart",itemId)
})
</script>

<template>
    <header class="py-4 shadow-sm bg-white">
        <div class="container flex items-center justify-between">
            <router-link :to="{name:'home'}">
                <img src="@/assets/images/logo.svg" alt="Logo" class="w-32">
            </router-link>

            <div class="w-full max-w-xl relative flex">
                <span class="absolute left-4 top-3 text-lg text-gray-400">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <input type="text" name="search" id="search"
                       class="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
                       placeholder="search">
                <button
                    class="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex">Search</button>
            </div>

            <div class="flex items-center space-x-4">
                <a href="#" class="text-center text-gray-700 hover:text-primary transition relative" v-if="store.state.user.token">
                    <div class="text-2xl">
                        <i class="fa-regular fa-heart"></i>
                    </div>
                    <div class="text-xs leading-3">Wishlist</div>
                    <div
                        class="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                        8</div>
                </a>
                <button @click="toggleCart" class="text-center text-gray-700 hover:text-primary transition relative">
                    <div class="text-2xl" >
                        <i class="fa-solid fa-bag-shopping"></i>
                    </div>
                    <div class="text-xs leading-3">Cart</div>
                    <div
                        class="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                        {{ store.state.cart.length }}</div>
                </button>
                <a href="#" class="text-center text-gray-700 hover:text-primary transition relative" v-if="store.state.user.token">
                    <div class="text-2xl">
                        <i class="fa-regular fa-user"></i>
                    </div>
                    <div  class="text-xs leading-3">Account</div>
                </a>
            </div>
        </div>
    </header>

    <div class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ease-in-out"
         :class="{'translate-x-0': isCartOpen, 'translate-x-full': !isCartOpen}">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">SHOPPING CART</h2>
            <button @click="toggleCart" class="text-gray-500 hover:text-gray-800">
                <i class="fa-solid fa-xmark text-xl"></i>
            </button>
        </div>

        <div v-if="store.state.cart.length > 0">
            <div v-for="(item, index) in store.state.cart" :key="index" class="flex items-center border-b pb-2 mb-2">
                <img src="@/assets/images/products/product1.jpg" alt="Product" class="w-12 h-12 object-cover mr-3">
                <div>
                    <h3 class="text-sm font-medium">{{ item.name }}</h3>
                    <span>{{ item.quantity }} * <span class="text-primary font-semibold">Rs. {{ item.price }}</span></span>

                </div>
                <button @click="removeFromCart(item.id)" class="ml-auto text-red-500 hover:text-red-700">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>

            <div class="mt-4">
                <p class="text-lg font-semibold">Subtotal: Rs. {{ store.state.cart.reduce((sum, item) => sum + parseInt(item.totalPrice), 0) }}</p>
            </div>

            <div class="mt-4 flex space-x-2">
                <router-link
                    :to="{ name: 'cartList' }"
                    class="w-1/2 py-3 px-6 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-500 transform hover:scale-105 transition duration-300 ease-in-out">
                    View Cart
                </router-link>

                <button class="w-1/2 py-2 bg-primary text-white rounded hover:bg-primary-dark">Checkout</button>
            </div>
        </div>
        <p v-else class="text-gray-500 text-center">Your cart is empty.</p>
    </div>

</template>

<style scoped>

</style>
