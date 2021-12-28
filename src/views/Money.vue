<template>
  <layout class="layout1">
    <Tabs :datasource="recordTypeList" :value.sync="record.type" />
    <!-- {{ record }} -->
    <Tags @update:value="onUpdateTags" :Type.sync="record.type" />

    <Notes
      fieldname="备注"
      placeholder="在这里添加备注"
      :value.sync="record.notes"
      class="notes"
    />
    <Notes
      fieldname="日期"
      placeholder="在这里添加备注"
      :value.sync="record.createdAt"
      type="date"
      class="notes"
    />

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
import { Component, Watch } from "vue-property-decorator";
import typeList from "../constants/typeList";
import dayjs from "dayjs";

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
  record: any = {
    tags: [],
    notes: "",
    type: "-",
    number: 0,
    createdAt: new Date().toISOString(),
  };
  recordTypeList = typeList;

  created() {
    // console.log(dayjs(this.record.createdAt).format("YYYY年MM月DD日"));
    // console.log("money");

    // console.log(this.record.createdAt);
    console.log("测试record");

    console.log(this.record.type);

    this.$store.commit("fetchRecords");
  }

  onUpdateTags(tag: string[]) {
    this.record.tags = tag;
  }
  onUpdateNotes(value: string) {
    // this.record.createdAt = value;
    this.record.notes = value;
  }
  onUpdateNumber(output: string) {
    this.record.number = parseFloat(output);
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
    this.record.notes = "";
    this.record.createdAt = new Date().toISOString();
  }
}
</script>

<style lang="scss" scoped>
.layout1 {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.notes {
  // border: 1px solid red;
  height: 40px;
  ::v-deep input {
    height: 40px;
    font-size: 14px;
    color: rgb(44, 43, 43);
  }
}
</style>









