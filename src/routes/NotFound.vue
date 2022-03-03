<template>
  <div class="not-found">
    <div class="status">
      404
    </div>
    <div class="message">
      Page Not Found!
    </div>
  </div>
</template>

<style lang="scss" scoped>

.not-found{
  margin: auto;
  padding: 100px 20px;
  width: 500px;
  font-family: 'Oswald',sans-serif;
  line-height: 1.2;
  text-align: center;
  border: 10px solid $primary;
  border-radius: 50%;

  .status{
    font-size: 160px;
    color: $primary;
  }

  .message{
    font-size: 50px;
  }
}
</style>