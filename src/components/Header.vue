
<template>
  <header>
  <div class="collapse bg-dark" id="navbarHeader">
    <div class="container">
      <div class="row">
        <div class="col-sm-4 py-4">
          <h4 class="text-white">사이트맵</h4>
          <ul class="list-unstyled">
            <li>
              <router-link to="/" class ="text-white">메인 화면</router-link>
              
            </li>
            <li>
              <router-link to="/login" class="text-white" v-if="!$store.state.account.email">로그인</router-link>
              <a to="/login" class ="text-white" @click="logout()" v-else>로그아웃</a>
              
            </li>
            <li>
              <router-link to="/registerCard" class ="text-white" >물건 등록하기</router-link>
            </li>
            <li>
              <router-link to="/register" class ="text-white" v-if="!$store.state.account.email">회원가입</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="me-2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        <strong>Gallery</strong>
      </router-link>
      <router-link to="/cart" class="cart btn">
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
      </router-link>
      <span class="text-light" v-if="$store.state.account.email">{{userName}}님 안녕하세요!</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </div>
</header>
</template>

<script>
import store from '@/scripts/store';
import router from '@/scripts/router';
import axios from  "axios";
import {computed} from "vue";


export default {
  name: 'Header',
  setup(){
    const userName = computed(()=>store.state.account.email);
    const logout = () => {
      axios.post("/api/account/logout").then(() => {
        store.commit('setAccount', null);
        router.push({path: "/"});
      });


    }
    return {logout,userName};
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header .navbar .cart{
  margin-left: auto;
  color: #fff;
}
</style>
