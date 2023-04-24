

<template>
  
    <div class="form-signin w-100 m-auto">

        <!-- <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> -->
        <h1 class="h3 mb-3 fw-normal">Welcome to JJYLC.com!</h1>

        <div class="form-floating">
          <input type="text" class="form-control" id="floatingInput" placeholder="name" v-model="state.form.name">
          <label for="floatingInput">name</label>
        </div>
        <div class="form-floating">
          <input type="number" class="form-control" id="floatingPrice" placeholder="price" v-model="state.form.price">
          <label for="floatingPrice">price</label>
        </div>
        <div class="form-floating">
          <input type="number" class="form-control" id="floatingDiscountPer" placeholder="discount percent" v-model="state.form.discountPer">
          <label for="floatingDiscountPer">discount percent</label>
        </div>
        <div class="form-floating">
          <input type="file" class="form-control" id="floatingFile" placeholder="file upload">
          <label for="floatingFile">File</label>
        </div>


        <div>
          <label for="floatingTag">Choose a tag:</label>
          <select id="floatingTag">
            <option value="1">풍경화</option>
            <option value="2">인물화</option>
            <option value="3">정물화</option>
            <option value="4">크로키</option>
            <option value="5">추상화</option>
            <option value="6">누드화</option>
            <option value="7">초상화</option>
          </select>
        </div>


        <button class="w-100 btn btn-lg btn-primary" @click="submit()">submit</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2023</p>

    </div>

</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';

export default{
  setup(){
    
    const state = reactive({
      form :{
        name: "",
        price: "",
        discountPer: ""
      }
    });
    
    const submit = ()=>{
      const bookData = new FormData();
      let file = document.getElementById("floatingFile").files[0]
      let tag = document.getElementById("floatingTag").value
      bookData.append("name", state.form.name);
      bookData.append("price", state.form.price);
      bookData.append("discountPer", state.form.discountPer);
      bookData.append("file", file);
      bookData.append("tag", tag);

      axios.post("/api/upload", bookData, {
        headers:{
          'Content-Type' : 'multipart/form-data'
        }
      }).then(() => {
        console.log("업로드 성공");
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