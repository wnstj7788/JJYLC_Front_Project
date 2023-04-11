import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Cart from "@/pages/Cart";
import RegisterCard from "@/pages/RegisterCard";
import Register from "@/pages/Register.vue";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router"

const routes = [
    {path:'/', component: Home},
    {path:'/login', component: Login},
    {path:'/cart', component: Cart},
    {path: '/register', component: Register},
    {path: '/registerCard', component: RegisterCard}

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;