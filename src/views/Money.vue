<template>
  <layout class="layout1">
    {{ record }}
    <!-- {{ recordList }} -->
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    <Notes
      fieldname="备注"
      placeholder="在这里添加备注"
      @update:value="onUpdateNotes"
    />
    <Type :value.sync="record.type" />
    <Number
      @update:value="onUpdateNumber"
      :oneTag="record.tags"
      @submit="saveRecord"
    />
  </layout>
</template>

<script lang="ts">
import vue from "vue";
import Component from "vue-class-component";
import Tags from "../components/money/Tags.vue";
import Notes from "../components/money/Notes.vue";
import Type from "../components/money/Type.vue";
import Number from "../components/money/Number.vue";
import { Watch } from "vue-property-decorator";
import recordListModel from "../models/recordListModels";
import tagListModel from "../models/tagListModels";
// type RecordItem = {
//   tags: string[];
//   notes: string;
//   type: string;
//   number: number;
//   createdAt?: Date;
// };

const recordList = recordListModel.fetch();
// const tagList = tagListModel.data;
// const tagList = window.tagList;
@Component({
  components: { Tags, Notes, Type, Number },
})
export default class Money extends vue {
  record = { tags: [], notes: "", type: "-", number: 0 };
  recordList = recordList;
  // listdata = tagListModel.data.map((t) => t.name);
  // tags = this.listdata;
  tags = window.tagList;

  // @Watch("tags")
  // watchTags() {
  //   // tagListModel.data = this.tags;
  //   console.log(this.tags);
  //   tagListModel.save();
  // }
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
    recordListModel.create(this.record);
  }
  @Watch("recordList")
  onRecordListUpdate() {
    // window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
    recordListModel.save();
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









