import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Cart from "@/pages/Cart";
import RegisterCard from "@/pages/RegisterCard";
import Register from "@/pages/Register.vue";
import Record from '@/pages/Record.vue';
import Detail from '@/pages/Detail.vue'
import SearchResult from '@/pages/SearchResult.vue'

import {createRouter, createWebHistory} from "vue-router/dist/vue-router"

const routes = [
    {path:'/', component: Home},
    {path:'/login', component: Login},
    {path:'/cart', component: Cart},
    {path: '/register', component: Register},
    {path: '/registerCard', component: RegisterCard},
    {path: '/record', component: Record},
    {path: '/detail/:itemId',name: "Detail",component: Detail},
    {path: '/searchResult/:searchTerm', name: "SearchResult",component: SearchResult}

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;