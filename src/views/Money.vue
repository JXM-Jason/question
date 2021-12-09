<template>
  <layout class="layout1">
    {{ record }}
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    <Notes @update:value="onUpdateNotes" />
    <Type :value.sync="record.type" />
    <Number @update:value="onUpdateNumber" />
  </layout>
</template>

<script lang="ts">
import vue from "vue";
import Component from "vue-class-component";
import Tags from "../components/money/Tags.vue";
import Notes from "../components/money/Notes.vue";
import Type from "../components/money/Type.vue";
import Number from "../components/money/Number.vue";
type Record = {
  tags: string[];
  notes: string;
  type: string;
  number: number;
};
@Component({
  components: { Tags, Notes, Type, Number },
})
export default class Money extends vue {
  tags: string[] = ["衣", "食", "住", "行", "彩票"];
  record: Record = { tags: [], notes: "", type: "-", number: 0 };
  onUpdateTags(tag: string[]) {
    this.record.tags = tag;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateNumber(output: string) {
    this.record.number = parseFloat(output);
  }
}
</script>

<style lang="scss" scoped>
.layout1 {
  display: flex;
  flex-direction: column;
}
</style>









