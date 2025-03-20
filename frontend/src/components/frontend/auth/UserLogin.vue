<script setup>
import DefaultLayoout from "@/components/frontend/DefaultLayoout.vue";
import FormInput from "@/components/frontend/FormInput.vue";
import {reactive} from "vue";
import store from "@/store/index.js";
import router from "@/router/index.js";
import {toast} from "vue3-toastify";

const errors = reactive({
    email:"",
    password:""
})

const formData = reactive({
    email:"",
    password:""
})

const formSubmit = (()=>{
    try {
        store.dispatch("login",formData)
        toast.success("logged in successfully")
        router.push("/")

    }catch (err){

    }
})
</script>

<template>
<DefaultLayoout>
    <div class="contain py-16">
        <div class="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 class="text-2xl uppercase font-medium mb-1">Login</h2>
            <p class="text-gray-600 mb-6 text-sm">
                welcome back customer
            </p>
            <form @submit.prevent="formSubmit" autocomplete="off">
                <div class="space-y-2">
                    <div>

                        <FormInput
                          label="Email Address"
                          type="email"
                          v-model="formData.email"
                          :error="errors.email"
                          placeholder="youremail.@domain.com"
                        />
                    </div>
                    <div>
                        <FormInput
                            label="Password"
                            type="password"
                            v-model="formData.password"
                            :error="errors.password"
                            placeholder="*******"
                        />
                    </div>
                </div>
                <div class="flex items-center justify-between mt-6">
                    <div class="flex items-center">

                    </div>
                    <a href="#" class="text-primary">Forgot password</a>
                </div>
                <div class="mt-4">
                    <button type="submit"
                            class="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">Login</button>
                </div>
            </form>

            <!-- ./login with -->

            <p class="mt-4 text-center text-gray-600">Don't have account? <router-link  :to="{name:'userRegister'}"
                                                                             class="text-primary">Register
                now</router-link></p>
        </div>
    </div>
</DefaultLayoout>
</template>

<style scoped>

</style>
