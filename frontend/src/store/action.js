import axiosClient from "../axios";
import {updateQuantityFromCart} from "@/store/mutation.js";
import {data} from "autoprefixer";

export function login({commit}, data) {
    return axiosClient.post('/login', data)
        .then(({data}) => {
            commit('setUser', data.user);
            commit('setToken', data.token);
            commit('setSuccessMessage', data.message)
            return data;
        })
}

export function logout({commit}) {
    return axiosClient.post('/logout')
        .then((response) => {
            commit('setToken', null)
            return response;
        })
}

export function createProduct({commit}, product) {
    if (product.image instanceof File) {
        const form = new FormData();
        form.append('title', product.title);
        form.append('image', product.image);
        form.append('description', product.description || '');
        form.append('published', product.published ? 1 : 0);
        form.append('price', product.price);
        product = form;
    }
    return axiosClient.post('/products', product)
}

export function updateProduct({commit}, product) {
    const id = product.id
    if (product.image instanceof File) {
        const form = new FormData();
        form.append('id', product.id);
        form.append('title', product.title);
        form.append('image', product.image);
        form.append('description', product.description || '');
        form.append('published', product.published ? 1 : 0);
        form.append('price', product.price);
        form.append('_method', 'PUT');
        product = form;
    } else {
        product._method = 'PUT'
    }
    return axiosClient.post(`/products/${id}`, product)
}


export function getProducts({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
    commit('setProducts', [true])
    url = url || '/products'
    const params = {
        per_page: state.products.limit,
    }
    return axiosClient.get(url, {
        params: {
            ...params,
            search, per_page, sort_field, sort_direction
        }
    })
        .then((response) => {
            commit('setProducts', [false, response.data])
        })
        .catch(() => {
            commit('setProducts', [false])
        })
}

export function getProduct({commit}, id) {
    return axiosClient.get(`/products/${id}`)
}

export function deleteProduct({commit}, id) {
    return axiosClient.delete(`/products/${id}`)
}

export function addToCart({commit},id){
    commit("setProductToCart",id)
}
export function removeFromCart({commit},id){
    commit("removeProductFromCart",id)
}

export function updateCartQuantity({commit},{itemId,action}){
    commit("updateQuantityFromCart",{itemId,action})
}

export  function removeCartData({commit}){
    commit("removeAllCartData")
}

export function paymentIntegration(){
    return axiosClient.post('/initiate-payment')
        .then((response) => {
            return response;
        })
}

export function registerUser({commit},formData){
    return axiosClient.post('/user-register',formData).then(({data})=>{
        commit("setUser",data.user)
        commit("setToken",data.token)
        commit('setSuccessMessage', data.message)
        return data
    })
}

export function orderProduct({commit},orderDetails){
    return axiosClient.post('order',orderDetails).then(({data})=>{
        return data
    })
}
