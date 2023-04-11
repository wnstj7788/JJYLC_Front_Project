<template>
    <div class="form-signin w-100 m-auto">

        <!-- <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> -->
        <h1 class="h3 mb-3 fw-normal">Welcome to JJYLC.com!</h1>

        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" placeholder="name" v-model="state.form.name">
          <label for="floatingInput">name</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPrice" placeholder="price" v-model="state.form.price">
          <label for="floatingPrice">price</label>
        </div>
        <div class="form-floating">
          <input type="number" class="form-control" id="floatingDiscountPer" placeholder="discount percent" v-model="state.form.price">
          <label for="floatingDiscountPer">discount percent</label>
        </div>
        <div class="form-floating">
          <input type="file" class="form-control" id="floatingFile" placeholder="Password" >
          <label for="floatingFile">floatingFile</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" @click="submit()">submit</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2023</p>

    </div>

</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';
import store from "@/scripts/store";
import router from '@/scripts/router';

export default{
  setup(){
    const state = reactive({
      form :{
        name: "",
        password: ""
      }
    });
    
    const submit = ()=>{
      axios.post("/api/account/register", state.form).then((res)=>{
        store.commit("setAccount", res.data);
        sessionStorage.setItem("id", res.data);
        router.push({path:"/"});
        alert("회원가입 성공");
      }).catch(()=>{
        alert("에러가 발생했습니다.");
      })

    }

    return {state, submit};


  }
}
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}</style>