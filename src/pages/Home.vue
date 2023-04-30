<template>
  <div class="home">
    <div class="album py-5 bg-light">
      <div class="container">
        <div>
          <input type="text" :value="searchTerm" @input="setSearchTerm" @blur="() => setListOpen(false)" @focus="() => setListOpen(true)" />
          <button @click="removeSelectedNumber">X</button>
        </div>
        <ul v-if="this.isFocus">
          <li v-if="filteredList.length === 0">검색결과가 없습니다.</li>
          <li v-else v-for="num in filteredList " v-bind:key="num" @mousedown="setSelectedNumber(num)" >{{ num.name }}</li>
        </ul>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="(item, idx) in state.items" :key="idx">
            <!-- {{ item }} -->
            <Card :item="item"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import axios from "axios";
import { reactive } from "vue";

export default {
  name: "Home",
  components: {
    Card
  },
  setup(){
    const state = reactive({
      items: []
    })

    axios.get("/api/items")
    .then((res)=>{
      state.items = res.data;
      console.log(res)
    })


    return {state};
  },data() {
    return {
      recentSearchKeyword : [
      {
          name: '최근 검색어..11',
          value: 'one'
        },
        {
          name: '최근 검색어..22',
          value: 'two'
        },
        {
          name: 'Three',
          value: 'three'
        },
        {
          name: 'Four',
          value: 'four'
        }
      ],
      searchTerm: '',
      isFocus: false,
      selectedObj: null,
    }
  },methods: {
    setSearchTerm(e) {
      this.searchTerm = e.target.value;
    },
    setListOpen(isOpen) {
      this.isFocus = isOpen;
    },
    setSelectedNumber(numObj) {
      this.selectedObj = numObj;
      this.searchTerm = numObj.name
    },
    removeSelectedNumber() {
      this.selectedObj = null;
      this.searchTerm = '';
    },async getSearchResult() {
      console.log(this.recentSearchKeyword);
      let searchResult;
      await axios.get(`/api/search?searchName=${this.searchTerm}`)
      .then((res)=>{
        // state.items = res.data;
        console.log(res)
        searchResult = res.data;
        console.log(searchResult)
      })
      return searchResult;
    }
  },computed: {
    filteredList() {
      if(this.searchTerm === '') {
        return this.recentSearchKeyword;
      } else{
        let searchResult = this.getSearchResult();
        console.log("------------------");
        let dataList = [];
        for (let index = 0; index < searchResult.length; index++) {
          let tempData = {
            name : searchResult[index]
          }
          dataList.push(tempData)
          
        }
        return dataList;
      }

    }
  }
}
</script>

<style scoped></style>