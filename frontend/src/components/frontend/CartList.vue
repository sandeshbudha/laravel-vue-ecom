<script setup>
import DefaultLayoout from "@/components/frontend/DefaultLayoout.vue";
import store from "@/store/index.js";
import {toast} from "vue3-toastify";
import {ref} from "vue";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from 'uuid';
import state from "@/store/state.js";
import router from "@/router/index.js";

let  totalCart = ref(store.state.cart.length)

const updateCartQuantity = ((itemId,action)=>{
    store.dispatch("updateCartQuantity",{itemId,action})
})

const removeCart = (()=>{

   if (parseInt(totalCart.value) > 0){
       store.dispatch("removeCartData").then(()=>{
           toast.success("item cart removed successfully")
           totalCart.value = store.state.cart.length
       })
   }
})

const proceedOrder = (()=>{

    if(state.user.token){
        router.push({name:'checkout'})
    }else {
        toast.error("proceed to login first ")
    }
})

</script>

<template>
    <DefaultLayoout>
        <div class="min-h-screen bg-white p-6 md:p-10">
            <div class="grid md:grid-cols-3 gap-8">
                <!-- Cart Items -->
                <div class="md:col-span-2" >
                    <h2 class="text-xl font-semibold mb-4">Shopping Cart</h2>
                    <div class="border rounded-lg overflow-hidden" v-if="store.state.cart.length > 0">
                        <!-- Cart Header -->
                        <div class="grid grid-cols-6 items-center bg-gray-100 p-4 font-semibold text-sm text-gray-600">
                            <div class="col-span-1">Image</div>
                            <div class="col-span-2">Product Name</div>
                            <div class="col-span-1 text-center">Price</div>
                            <div class="col-span-1 text-center">Quantity</div>
                            <div class="col-span-1 text-center">Sub Total</div>
                        </div>

                        <!-- Cart Row -->
                        <div v-for="(item,index) of store.state.cart" class="grid grid-cols-6 items-center p-4 border-t">
                            <div class="col-span-1">
                                <img src="@/assets/images/products/product2.jpg" alt="Cover" class="w-16 h-auto rounded shadow">
                            </div>
                            <div class="col-span-2 text-sm">
                                <p class="font-medium">{{ item.name}}</p>
                            </div>
                            <div class="col-span-1 text-center font-medium">Rs. {{ item.price }}</div>
                            <div class="col-span-1 flex items-center justify-center space-x-2">
                                <button @click="updateCartQuantity(item.id,'decrement')" class="w-8 h-8 border rounded flex items-center justify-center text-lg">-</button>
                                <span class="w-6 text-center">{{ item.quantity }}</span>
                                <button @click ="updateCartQuantity(item.id,'increment')" class="w-8 h-8 border rounded flex items-center justify-center text-lg">+</button>
                            </div>
                            <div class="col-span-1 text-center font-semibold">Rs. {{ item.price * item.quantity }}</div>
                        </div>
                    </div>

                    <p v-else class="text-black-500 text-center">Your cart is empty.</p>
                    <!-- Cart Buttons -->
                    <div class="flex flex-wrap items-center justify-between mt-6 gap-4">
                        <button   @click="removeCart"  class="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">CLEAR CART</button>
                        <router-link :to="{name:'home'}" class="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                            &larr; CONTINUE SHOPPING
                        </router-link>
                    </div>
                </div>

                <!-- Cart Totals -->
                <div class="bg-gray-100 p-6 rounded-lg shadow-sm h-fit">
                    <h3 class="text-lg font-semibold mb-4">CART TOTALS</h3>
                    <div class="flex justify-between py-2 border-b">
                        <span>Subtotal</span>
                        <span class="font-medium">Rs. {{ store.state.cart.reduce((sum,item)=>sum + item.totalPrice,0) }}</span>
                    </div>
                    <div class="flex justify-between py-2 mb-6">
                        <span>Total</span>
                        <span class="font-semibold">Rs. {{ store.state.cart.reduce((sum,item)=>sum + item.totalPrice,0) }}</span>
                    </div>
                    <button @click="proceedOrder" class="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700">
                        PROCEED TO CHECKOUT &rarr;
                    </button>
                </div>
            </div>
        </div>

    </DefaultLayoout>
</template>

<style scoped>

</style>
