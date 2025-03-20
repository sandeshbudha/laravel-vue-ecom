<script setup>
import DefaultLayoout from "@/components/frontend/DefaultLayoout.vue";
import { reactive } from "vue";
import FormInput from '@/components/frontend/FormInput.vue'
import store from "@/store/index.js";
import router from "@/router/index.js";

const formData = reactive({
    fullName: "",
    email: "",
    password: "",
    confirm_password: ""
});

const errors = reactive({
    fullName: "",
    email: "",
    password: "",
    confirm_password: ""
});

// Validate Full Name
const validateFullName = () => {
    errors.fullName = formData.fullName.trim() ? "" : "Full Name is required";
};

// Validate Email
const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    errors.email = emailRegex.test(formData.email) ? "" : "Enter a valid email address.";
};

// Validate Password
const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    errors.password = passwordRegex.test(formData.password)
        ? ""
        : "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.";
};

// Validate Confirm Password
const validateConfirmPassword = () => {
    errors.confirm_password =
        formData.confirm_password === formData.password ? "" : "Passwords do not match.";
};

// Function to validate the form on submit
const validateForm = () => {
    validateFullName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    return !errors.fullName && !errors.email && !errors.password && !errors.confirm_password;
};

const registerForm = async () => {
    if (validateForm()) {

        try {
            await store.dispatch("registerUser", formData);

            router.push({ name: "home" });
        } catch (error) {

        }
    }
};
</script>

<template>
    <DefaultLayoout>
        <div class="contain py-16">
            <div class="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                <h2 class="text-2xl uppercase font-medium mb-1">Create an account</h2>
                <p class="text-gray-600 mb-6 text-sm">Register for new customer</p>

                <form @submit.prevent="registerForm" method="post" autocomplete="off">
                    <div class="space-y-2">
                        <div>

                            <FormInput
                                label="Full Name"
                                v-model="formData.fullName"
                                :error="errors.fullName"
                                placeholder="Fulan Fulana"
                                @validate="validateFullName"
                            />

                        </div>

                        <div>
                            <FormInput
                                label="Email address"
                                type="email"
                                v-model="formData.email"
                                :error="errors.email"
                                placeholder="youremail@domain.com"
                                @validate="validateEmail"
                            />
                        </div>

                        <div>
                            <FormInput
                                label="Password"
                                type="password"
                                v-model="formData.password"
                                :error="errors.password"
                                placeholder="*******"
                                @validate="validatePassword"
                            />
                        </div>

                        <div>
                            <FormInput
                                label="Confirm Password"
                                type="password"
                                v-model="formData.confirm_password"
                                :error="errors.confirm_password"
                                placeholder="*******"
                                @validate="validateConfirmPassword"
                            />
                        </div>
                    </div>

                    <div class="mt-4">
                        <button type="submit"
                                class="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                            Create account
                        </button>
                    </div>
                </form>

                <p class="mt-4 text-center text-gray-600">
                    Already have an account? <router-link :to="{name:'userLogin'}" class="text-primary">Login now</router-link>
                </p>
            </div>
        </div>
    </DefaultLayoout>
</template>

<style scoped>

</style>
