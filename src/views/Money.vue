<template>
  <layout class="layout1">
    {{ record }}
    <!-- {{ recordList }} -->
    <Tags @update:value="onUpdateTags" />
    <Notes
      fieldname="备注"
      placeholder="在这里添加备注"
      @update:value="onUpdateNotes"
    />
    <Tabs :datasource="recordTypeList" :value.sync="record.type" />
    <Number
      @update:value="onUpdateNumber"
      :oneTag="record.tags"
      @submit="saveRecord"
    />
  </layout>
</template>

<script lang="ts">
import vue from "vue";
import Tabs from "../components/Tabs.vue";
import Tags from "../components/money/Tags.vue";
import Notes from "../components/money/Notes.vue";
import Type from "../components/money/Type.vue";
import Number from "../components/money/Number.vue";
import { Component } from "vue-property-decorator";
import typeList from "../constants/typeList";

@Component({
  components: { Tabs, Notes, Tags, Number },
  computed: {
    recordList() {
      return this.$store.state.recordList;
    },
    tagList() {
      return this.$store.state.tagList;
    },
  },
})
export default class Money extends vue {
  record = { tags: [], notes: "", type: "-", number: 0 };
  recordTypeList = typeList;
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateTags(tag: string[]) {
    this.record.tags = tag;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateNumber(output: string) {
    this.record.number = parseFloat(output);
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss" scoped>
.layout1 {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
</style>









