<template>
  <RouterLink
    to="/"
    class="logo">
    <span>MovieCart</span>.com
  </RouterLink>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.logo{
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  color: $black;
  
  span{
    color:$primary;
  }

  &:hover{
    color:$black;
  }
}
</style>