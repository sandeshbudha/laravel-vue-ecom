<script setup>
import {v4 as uuidv4} from "uuid";
import {ref} from "vue";
import CryptoJS from "crypto-js";

const secret = ref("8gBm/:&EnhH.1/q");
const hashResult = ref("");


const generateHash = (message) => {
    const hash = CryptoJS.HmacSHA256(message, secret.value);
    hashResult.value = CryptoJS.enc.Base64.stringify(hash);
    return hashResult.value
};

const paymentIntegration =  (()=>{

    // Create a dynamic form
    const transactionId = uuidv4() // Unique ID

    const form = document.createElement("form");
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"; // eSewa test endpoint
    form.method = "POST";
    const amount =1230;
    const production_code = 'EPAYTEST';

    const dataString = `total_amount=${amount},transaction_uuid=${transactionId},product_code=${production_code}`;

    const fields = {
        amount :amount,
        tax_amount:0,
        total_amount:amount,
        transaction_uuid:transactionId,
        product_code:production_code,
        product_service_charge:0,
        product_delivery_charge:0,
        success_url: window.location.origin + "/esewa-success",
        failure_url: window.location.origin + "/esewa-fail",
        signed_field_names : "total_amount,transaction_uuid,product_code",
        signature : generateHash(dataString)
    };



    // Append input fields to form
    Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
    });

    // Append form to body and submit
    document.body.appendChild(form);
    form.submit();

})

</script>

<template>

</template>

<style scoped>

</style>
