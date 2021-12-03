<template>
  <div class="nav">
    <router-link to="/Labels"> 标签 </router-link>|
    <router-link to="/Money">记一笔</router-link> |
    <router-link to="/Statistics">统计</router-link>
  </div>
</template>

<script>
import x from "@assets/icons/labels.svg";
console.log(x);
export default {};
</script>

<style lang="scss" scoped>
.nav {
  border: 1px solid red;
}
</style>