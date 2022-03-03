<template>
  <div class="about">
    <div class="photo">
      <!-- 로딩 애니메이션 -->
      <Loader
        v-if="imageLoading"
        :absolute="true" />
      <img
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>


<script>
import Loader from '~/components/Loader.vue'

export default {
  data(){
    return{
      imageLoading: true
    }
  },
  components:{
    Loader
  },
  computed:{
    image(){
      //store -> state -> about -> image데이터
      return this.$store.state.about.image
    },
    name(){
      //store -> state -> about -> name데이터
      return this.$store.state.about.name
    },
    email(){
      //store -> state -> about -> email데이터
      return this.$store.state.about.email
    },
    blog(){
      //store -> state -> about -> blog데이터
      return this.$store.state.about.blog
    },
    phone(){
      //store -> state -> about -> phone데이터
      return this.$store.state.about.phone
    }
  },
  methods: {
    async init(){
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  },
  mounted(){
    this.init()
  }
}
</script>


<style lang="scss" scoped>
@import '~/scss/main.scss';

.about{
  text-align: center;

  .photo{
    position: relative;
    margin: 40px auto 20px;
    padding: 30px;
    width: 250px;
    height: 250px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    background-color: $gray-200;
    overflow: hidden;

    img{
      width: 100%;
      border-radius: 50%;
    }
  }

  .name{
    margin-bottom: 20px;
    font-family: 'Oswald',sans-serif;
    font-size: 40px;
  }
}
</style>