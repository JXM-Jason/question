<template>
  <layout>
    <Tabs classPrefix="types" :datasource="recordTypeList" :value.sync="type" />
    <Tabs
      classPrefix="interval"
      :datasource="intervalList"
      :value.sync="interval"
    />
  </layout>
</template>

<script lang="ts">
import vue from "vue";
import Type from "../components/money/Type.vue";
import Tabs from "../components/Tabs.vue";
import { Component } from "vue-property-decorator";
import intervalList from "../constants/intervalList";
import typeList from "../constants/typeList";
@Component({
  components: { Type, Tabs },
})
export default class Statistics extends vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = typeList;
}
</script>

<style lang="scss" scoped>
::v-deep .tabs > .interval-item {
  height: 48px;
  line-height: 48px;
}
</style>









