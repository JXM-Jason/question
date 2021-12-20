<template>
  <div class="type">
    <ul>
      <li :class="value === '-' && 'selected'" @click="changeType('-')">
        支出
      </li>
      <li :class="value === '+' && 'selected'" @click="changeType('+')">
        收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Types extends vue {
  @Prop(String) readonly value!: string;
  changeType(type: string) {
    if (type !== "-" && type !== "+") {
      throw new Error("type is unkonw");
    }
    this.$emit("update:value", type);
  }
}
</script>

<style lang="scss" scoped>
.type {
  ul {
    display: flex;
    background-color: #c4c4c4;
    text-align: center;
    line-height: 64px;
  }

  li {
    width: 50%;
    height: 64px;
    border: none;
    font-size: 24px;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>