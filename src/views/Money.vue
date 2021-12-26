<template>
  <layout class="layout1">
    {{ record }}
    <!-- {{ recordList }} -->
    <Tags @update:value="onUpdateTags" />

    <Notes
      fieldname="备注"
      placeholder="在这里添加备注"
      :value.sync="record.notes"
    />
    <Notes
      fieldname="日期"
      placeholder="在这里添加备注"
      :value.sync="record.createdAt"
      type="date"
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
</style>









