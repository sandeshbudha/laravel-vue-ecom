import {createRouter, createWebHistory} from "vue-router";
    import Login from "@/components/auth/Login.vue";
import Signup from "@/components/auth/Signup.vue";
import AdminLayout from "@/components/Admin/AdminLayout.vue";
import Dashboard from "@/components/Admin/Dashboard.vue";
import store from "@/store/index.js";
import NotFound from "@/components/NotFound.vue";
import Products from "@/components/Admin/products/Products.vue";
import ProductForm from "@/components/Admin/products/ProductForm.vue";
import Home from "@/components/frontend/Home.vue"
import CartList from "@/components/frontend/CartList.vue";
import Register from "@/components/frontend/auth/Register.vue";
import UserLogin from "@/components/frontend/auth/UserLogin.vue";

const routes = [

    //frontend route
    {
        path:"/",
        name:"home",
        component:Home,
    },

    {
        path:"/cart/list",
        name:"cartList",
        component:CartList,
    },
    {
        path:"/esewa-success",
        name:"esewa-success",
        component:CartList,
    },

    {
        path:"/esewa-fail",
        name:"esewa-fail",
        component:CartList,
    },

    {
        path:"/user-login",
        name:"userLogin",
        component:UserLogin,
    },


    {
        path:"/user-register",
        name:"userRegister",
        component:Register,
    },


    //admin routes
    {
        path:"/login",
        name:"login",
        component:Login,
    },
    {
        path:"/signup",
        name:"signup",
        component: Signup
    },
    {
        path:"/admin",
        name:"admin",
        component: AdminLayout,
        meta : {
            requiresAuth:true,
        },
        children : [{
            name:"admin.dashboard",
            path:"dashboard",
            component:Dashboard
        },
        {
            name:"admin.products",
            path:"products",
            component:Products
        },
            {
                name:"admin.products.create",
                path:"products/create",
                component:ProductForm
            },
            {
                name:"admin.products.edit",
                path:"products/edit/:id",
                component:ProductForm,
                props: (route) => ({ id: Number(route.params.id) })
            }
        ]

    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
    },
]

const router = createRouter({
    history:createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
        // Check if the user is logged in
        if (!store.state.user.token) {
            // If not logged in, redirect to home or login page
            return next({ name: 'home' });
        }

        // Check if the user is an admin
        if (to.path.startsWith('/admin') && store.state.user.is_admin != true) {
            // If not an admin, redirect to home or another page
            return next({ name: 'home' });
        }
    }

    // If the route requires a guest (non-authenticated) user
    if (to.meta.requiresGuest && store.state.user.token) {
        return next({ name: 'admin.dashboard' });
    }

    next(); // Proceed with the navigation
});


export default router;
