<template>
    <div class="form-signin w-100 m-auto">

        <!-- <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> -->
        <h1 class="h3 mb-3 fw-normal">Welcome to JJYLC.com!</h1>

        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="state.form.email">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="state.form.password">
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating">
          <input type="name" class="form-control" id="floatingName" placeholder="Name" v-model="state.form.name">
          <label for="floatingName">Name</label>
        </div>
        <div class="form-floating">
          <input type="phonenum" class="form-control" id="floatingPhone" placeholder="Phonenum" v-model="state.form.phonenum">
          <label for="floatingPhone">Phonenum</label>
        </div>

      <button class="w-100 btn btn-lg btn-primary" @click="submit()">Sign Up</button>
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
        email: "",
        password: "",
        name : "",
        phonenum : ""
      }
    });
    
    const submit = ()=>{
      axios.post("/api/account/register", state.form).then((res)=>{
        store.commit("setAccount", res.data);
        sessionStorage.setItem("email", res.data);
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
  margin-bottom: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.form-signin input[type="name"] {
  margin-bottom: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.form-signin input[type="phonenum"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}



</style>