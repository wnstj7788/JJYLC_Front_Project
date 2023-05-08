<template>
  {{route.params.searchTerm}}
</template>

<script>
import {useRoute} from "vue-router/dist/vue-router";

export default {
  name: "Home",
  components: {
  },
  setup(){
    const route = useRoute();
   

    return {route
  };
  }
}
</script>

<style scoped></style>