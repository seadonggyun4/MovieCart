<template>
  <!-- 헤드라인 -->
  <Headlin />
  <!-- search bar -->
  <Search />
</template>

<script>
import Headlin from '~/components/Headline.vue'
import Search from '~/components/Search.vue'


export default {
  components:{
    Headlin,
    Search
  }
}
</script>