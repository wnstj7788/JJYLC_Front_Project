<template>
    <div class="card shadow-sm">
<!--        <span class="img" :style="{backgroundImage: `url(${item.imgPath})`}" />-->
      <span class="img" :style="{backgroundImage: `url(${encodeURI(item.imgPath)})`}" />
        <!-- <img :src="item.imgPath" alt=""/> -->
        <div class="card-body">
            <p class="card-text">
              <span ><a href="#" @click="moveToDetail(item.id)">{{item.name}}</a> &nbsp;</span>


              <span class="discount badge bg-danger">
                    {{ item.discountPer }}%
                </span>
            </p>
            
            <div class="d-flex justify-content-between align-items-center">
                <button class="btn btn-primary" @click="addToCart(item.id)">

                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>

                </button>
                <small class="price text-muted">
                    {{ lib.getNumverFormatted(item.price) }}원
                </small>
                
                <small class="real text-danger">
                    {{ lib.getNumverFormatted(item.price - (item.discountPer*item.discountPer /100))  }}원
                </small>
            </div>
        </div>
    </div>
</template>

<script>
import lib from "@/scripts/lib"
import axios from "axios"
import router from "@/scripts/router";

export default {
    name: "Card",
    props: {
        item: Object
    },
    setup(){
        const addToCart = (itemId)=>{
            axios.post(`/api/cart/items/${itemId}`).then((data)=>{

                console.log("success");
                console.log(data);
            })
        }

        const moveToDetail = (itemId)=>{
          // router.push({path:`/detail/:${itemId}`})
          router.push({name:'Detail',params:{itemId:itemId}})
        }
        return {lib, addToCart,moveToDetail}
    }
}
</script>

<style scoped>
.card .img{
    display: inline-block;
    width: 100%;
    height: 250px;
    background-size: cover;
    background-position: center;
}

.card .card-body .price{
    text-decoration: line-through;
}
</style>