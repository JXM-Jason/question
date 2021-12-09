<template>
  <nav>
    <router-link to="/Labels" class="link" active-class="selected">
      <icon name="labels" />
      标签
    </router-link>
    <router-link to="/Money" class="link" active-class="selected">
      <icon name="money" />
      记一笔
    </router-link>
    <router-link to="/Statistics" class="link" active-class="selected">
      <icon name="statistics" />
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  font-size: 12px;
  padding: 2px 0 0 0;
  > .link {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    padding: 2px 0;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .link.selected {
    color: red;
  }
}
</style>