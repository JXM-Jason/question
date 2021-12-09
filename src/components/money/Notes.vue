<template>
  <label class="notes">
    <span>备注</span>
    <input type="text" placeholder="在这里添加备注" v-model="value" />
  </label>
</template>

<script lang="ts">
import vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component
export default class Notes extends vue {
  value = "";
  @Watch("value")
  onValueChange(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  // border: 1px solid blue;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  font-size: 16px;
  padding-left: 16px;
  span {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    border: none;
    color: #999999;
    background-color: #f5f5f5;
    padding-right: 16px;
    font-size: 16px;
  }
}
</style>