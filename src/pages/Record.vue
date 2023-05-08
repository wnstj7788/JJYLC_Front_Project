<template>
  <div class="cart">
    <div class="container">
      <ul>
        <li v-for="(i, idx) in state.items" :key="idx">
          <span class="img" :style="{backgroundImage: `url(${i.imgPath})`}" />
          <span class="name">{{ i.itemName }}</span>
          <span class="orderDate">{{ i.orderDate }}</span>
          <span class="orderStatus">{{ i.orderStatus }}</span>
          <span class="price">{{ lib.getNumverFormatted(i.orderPrice - i.orderPrice * i.discountPer / 100) }}원</span>
        </li>
      </ul>
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
      axios.get("/api/orderList").then(({data}) => {
        console.log(data);
        state.items = data;
      })
    }

    load();

    return {state, lib};


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