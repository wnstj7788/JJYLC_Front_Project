<template>
  <div>
    Detail Page
    item id : {{this.$route.query.id}}
  </div>

</template>

<script>

import {useRoute} from "vue-router/dist/vue-router";

export default {
  setup() {
    const route = useRoute();
    return{route}
  }
}
</script>

<style scoped>

</style>