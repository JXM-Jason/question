<template>
  <div class="type">
    <button :class="value === '-' && 'selected'" @click="changeType('-')">
      支出
    </button>
    <button :class="value === '+' && 'selected'" @click="changeType('+')">
      收入
    </button>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

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
  // border: 1px solid green;
  display: flex;

  button {
    background-color: #c4c4c4;
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