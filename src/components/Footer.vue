<template>
  <footer>
    <Logo />
    <a
      href="https://github.com/seadonggyun4?tab=overview&from=2022-02-01&to=2022-02-27"
      target="_blank">(c){{ new Date().getFullYear() }} DongGyun</a>
  </footer>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components:{
    Logo
  }
}
</script>


<style lang="scss" scoped>
footer{
  padding: 70px 0;
  text-align: center;
  opacity: .3;

  .logo{
    margin-bottom: 4px;
    display: block;
  }
}
</style>