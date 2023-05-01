<template>
  <div class="home">
    <div class="album py-5 bg-light">
      <div class="container">
        <div>
          <input type="text" :value="searchTerm" @input="setSearchTerm" @blur="() => setListOpen(false)" @focus="() => {
              setListOpen(true);
              filteredList();
            }" />
          <button @click="removeSelectedNumber">X</button>
        </div>
        <ul v-if="isFocus">
          <!-- <li v-if="filteredList.length === 0">검색결과가 없습니다.</li> -->
          <li v-for="(item, idx) in temp.items " :key="idx" @mousedown="setSelectedNumber(item)" >{{ item.name }}</li>
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
import { ref } from "vue";

export default {
  name: "Home",
  components: {
    Card
  },
  setup(){
    const state = reactive({
      items: [],
    })

    let isFocus = ref(false);
    let   searchTerm =  ref('');
    let   selectedObj = null;
    let   recentSearchKeyword = 
    [
      {
          name: '최근 검색어..11',
          value: 'one'
        }
        ,
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
      ]

    axios.get("/api/items")
    .then((res)=>{
      state.items = res.data;
      console.log(res)
    })

    let setSearchTerm = (e) => {
      searchTerm.value = e.target.value;
    }

    let setListOpen = (isOpen) => {
      isFocus.value = isOpen;
    }

    let temp = reactive({
      items: [],
    })

    let filteredList=()=> {
      console.log(searchTerm);
      console.log(isFocus);
      if(searchTerm.value === '') {
        temp.items = [];
        temp.items = recentSearchKeyword;
        // for(let index = 0; index < recentSearchKeyword.length; index++) {
        //   console.log(recentSearchKeyword[index]);
        //   temp.items.push(recentSearchKeyword[index]);
        // }
        
      } else{
        let searchResult = getSearchResult();
        console.log("------------------");
        let dataList = [];
        console.log(searchResult);
        console.log(searchResult.PromiseState);
        if(searchResult != null && searchResult.PromiseState != "rejected"){
          for (let index = 0; index < searchResult.length; index++) {
            let tempData = {
              name : searchResult[index]
            }
            dataList.push(tempData)
            
          }
          temp.items = dataList;
        }
          
      }
      console.log(temp);
      console.log(temp.items);
      console.log(temp.items[0]);
      console.log(temp.items[0].name);

    }

    let getSearchResult =  async () => {
      console.log(recentSearchKeyword);
      let searchResult;
      await axios.get(`/api/search?searchName=${searchTerm.value}`)
      .then((res)=>{
        // state.items = res.data;
        console.log(res)
        searchResult = res.data;
        console.log(searchResult)
      })
      return searchResult;
    }

    let setSelectedNumber = (numObj) => {
      selectedObj = numObj;
      searchTerm.value = numObj.name
    }
    let removeSelectedNumber = ()  => {
      selectedObj = null;
      searchTerm.value = '';
    }


    return {state, isFocus, searchTerm, selectedObj, recentSearchKeyword, temp
      , setSearchTerm
    ,setListOpen
    ,filteredList
    ,setSelectedNumber
    ,removeSelectedNumber
  };
  },data() {
    return {
      
      
    }
  },methods: {
    // setSearchTerm(e) {
    //   this.searchTerm = e.target.value;
    // },
    // setListOpen(isOpen) {
    //   this.isFocus = isOpen;
    // },
  },computed: {
    
  }
}
</script>

<style scoped></style>