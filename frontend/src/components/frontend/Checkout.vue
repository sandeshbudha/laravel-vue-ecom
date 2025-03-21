<script setup>

import DefaultLayoout from "@/components/frontend/DefaultLayoout.vue";
import FormInput from "@/components/frontend/FormInput.vue";
import {ref} from "vue";
import store from "@/store";
import router from "@/router/index.js";

const formFields = ref({
    first_name : "",
    last_name : "",
    phone_number : "",
    province : "",
    district : "",
    city : "",
    address : "",
})

const errors = ref({
    first_name : "",
    last_name : "",
    phone_number : "",
    province : "",
    district : "",
    city : "",
    address : "",
})


const orderProduct =  async ()=>{
    const orderDetails = {
        customerDetails : formFields.value,
        orderItems : store.state.cart,
        total_amount : store.state.cart.reduce((sum,item)=>sum+=item.totalPrice,0)

    }

    try{
        await store.dispatch("orderProduct",orderDetails).then((res)=>{
            router.push({name:"home"})
            store.state.cart=[];
             localStorage.removeItem('cart')
        })

    }catch (err){

    }
}
</script>

<template>
<DefaultLayoout>
    <div class="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">

        <div class="col-span-8 border border-gray-200 p-4 rounded">
            <h3 class="text-lg font-medium capitalize mb-4">Checkout</h3>
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>

                        <FormInput
                          label="First Name"
                          v-model="formFields.first_name"
                          :error="errors.first_name"
                        />
                    </div>
                    <div>
                        <FormInput
                            label="Last Name"
                            v-model="formFields.last_name"
                            :error="errors.last_name"
                        />
                    </div>
                </div>
                <div>
                    <FormInput
                        label="Phone Number"
                        v-model="formFields.phone_number"
                        :error="errors.phone_number"
                        type="number"
                    />
                </div>
                <div>
                    <FormInput
                        label="Province"
                        v-model="formFields.province"
                        :error="errors.province"
                        required
                    />
                </div>
                <div>
                    <FormInput
                        label="District"
                        v-model="formFields.district"
                        :error="errors.district"
                    />
                </div>
                <div>
                    <FormInput
                        label="City"
                        v-model="formFields.city"
                        :error="errors.city"
                    />
                </div>
                <div>
                    <FormInput
                        label="address"
                        v-model="formFields.address"
                        :error="errors.address"
                    />
                </div>
            </div>

        </div>

        <div class="col-span-4 border border-gray-200 p-4 rounded">
            <h4 class="text-gray-800 text-lg mb-4 font-medium uppercase">order summary</h4>
            <div class="space-y-2">
                <div class="flex justify-between" v-for="(cartItem,index) in  store.state.cart">
                    <div>
                        <h5 class="text-gray-800 font-medium">{{ cartItem.name }}</h5>

                    </div>
                    <p class="text-gray-600">
                        x{{ cartItem.quantity }}
                    </p>
                    <p class="text-gray-800 font-medium">Rs. {{ cartItem.price }}</p>
                </div>
            </div>

            <div class="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                <p>subtotal</p>
                <p>Rs .{{ store.state.cart.reduce((sum,item)=>sum+=item.totalPrice,0) }}</p>
            </div>

            <div class="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                <p>shipping</p>
                <p>Free</p>
            </div>

            <div class="flex justify-between text-gray-800 font-medium py-3 uppercas">
                <p class="font-semibold">Total</p>
                <p>Rs. Rs .{{ store.state.cart.reduce((sum,item)=>sum+=item.totalPrice,0) }}</p>
            </div>

            <button @click="orderProduct"
               class="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">Place
                order</button>
        </div>

    </div>
</DefaultLayoout>
</template>

<style scoped>

</style>
