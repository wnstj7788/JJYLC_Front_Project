<template>
  <div>
    Detail Page
    item id : {{route.params.itemId}}
  </div>

</template>

<script>

import {useRoute} from "vue-router/dist/vue-router";
// import axios from "axios";
// import {reactive} from "vue";

export default {
  setup() {
    const route = useRoute();

    // const state = reactive({
    //   items: []
    // });
    // const load = () => {
    //   axios.get(`/api/detail/${route.query.id}`).then(({data}) => {
    //     console.log(data);
    //     state.items = data;
    //   })
    // }

    // load();

    return{route}
  }
}
</script>

<style scoped>

</style>