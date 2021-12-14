<template>
  <label class="notes">
    <span>{{ this.fieldname }}</span>
    <input
      type="text"
      :value="value"
      :placeholder="placeholder"
      @input="onValueChange($event.target.value)"
    />
  </label>
</template>

<script lang="ts">
import vue from "vue";
import { Watch, Prop, Component } from "vue-property-decorator";

@Component
export default class Notes extends vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop(String) fieldname!: string;
  @Prop(String) placeholder?: string;

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