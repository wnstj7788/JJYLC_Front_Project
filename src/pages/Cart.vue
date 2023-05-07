<template>
  <div class="cart">
    <div class="container">
      <ul>
        <li v-for="(i, idx) in state.items" :key="idx">
          <span class="img" :style="{backgroundImage: `url(${i.imgPath})`}" />
          <span class="name">{{ i.name }}</span>
          <span class="price">{{ lib.getNumverFormatted(i.price - i.price * i.discountPer / 100) }}원</span>
          <i class="fa fa-trash" @click="remove(i.id)"></i>
        </li>
      </ul>
      <div class="row">
        <div class="col text-center">
          <button class="btn btn-primary" @click="order()"> 주문확정 </button> <br>
          <router-link to="/record" class="record btn btn-primary"> 배송조회 </router-link>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios';
import {reactive} from 'vue';
import lib from "@/scripts/lib"

export default {
  setup() {
    const state = reactive({
      items: []
    });

    const load = () => {
      axios.get("/api/cart/items").then(({data}) => {
        console.log(data);
        state.items = data;
      })
    }

    const order = () =>{
      axios.get("api/order").then(({data}) =>{
        console.log(data);
      })
    }

    const remove = (itemId) => {
      axios.delete(`/api/cart/items/${itemId}`).then(() => {
        load();
      })
    }

    load();

    return {state, lib, remove, order};


  }
}
</script>

<style scoped>
.cart ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cart ul li {
  border: 1px solid #eee;
  margin-top: 25px;
  margin-bottom: 25px;
}

.cart ul li img {
  width: 150px;
  height: 150px;
}

.cart ul li .name {
  margin-left: 25px;
}

.cart ul li .price {
  margin-left: 25px;
}

.cart ul li i {
  float: right;
  font-size: 20px;
  margin-top: 65px;
  margin-right: 50px;
}

.cart .img{
  display: inline-block;
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
}


</style>