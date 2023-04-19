<template>
  <div class="form-signin w-100 m-auto">

    <!-- <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> -->
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
             v-model="state.form.email">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
             v-model="state.form.password">
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input id="remember" type="checkbox" v-model="rememberMe"> Remember me
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" @click="submit()">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>

  </div>

</template>

<script>
import axios from 'axios';
import {reactive} from 'vue';
import store from "@/scripts/store";
import router from '@/scripts/router';
import {ref} from 'vue';
import {useCookies} from "vue3-cookies";

export default {
  setup() {
    const rememberMe = ref(false);
    const {cookies} = useCookies();
    const state = reactive({
      form: {
        email: "",
        password: ""
      }
    });

    state.form.email = cookies.get('useremail');

    const submit = () => {
      if(rememberMe.value){
        cookies.set('useremail',state.form.email);
      }else{
        cookies.remove('useremail');
      }

      axios.post("/api/account/login", state.form).then((res) => {
        store.commit("setAccount", res.data);
        sessionStorage.setItem("email", res.data);
        router.push({path: "/"});
        alert("로그인 성공");
      }).catch(() => {
        alert("로그인 정보 없음");
      })

    }

    return {state, submit, rememberMe,cookies};
  },
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