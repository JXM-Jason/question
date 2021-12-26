<template>
  <label class="notes">
    <span>{{ this.fieldname }}</span>
    <template v-if="type === 'date'">
      <input
        :type="type || 'text'"
        :value="Timestring(value)"
        :placeholder="placeholder"
        @compositionstart="flag = false"
        @input="onValueChange($event.target.value)"
      />
    </template>
    <template v-else>
      <input
        :type="type || 'text'"
        :value="value"
        :placeholder="placeholder"
        @change="onValueChange($event.target.value)"
      />
    </template>
  </label>
</template>

<script lang="ts">
import dayjs from "dayjs";
import vue from "vue";
import { Watch, Prop, Component } from "vue-property-decorator";

@Component
export default class Notes extends vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop(String) fieldname!: string;
  @Prop(String) placeholder?: string;
  @Prop(String) type?: string;

  Timestring(time: string) {
    // console.log("1");
    // console.log(dayjs(time).valueOf());
    // console.log("2");
    // console.log(dayjs(time).format("YYYY-MM-DD").valueOf());
    // console.log("3");

    return dayjs(time).format("YYYY-MM-DD");
  }
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