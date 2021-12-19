<template>
  <div class="tags">
    <ul>
      <li
        v-for="item in tagList"
        :key="item.id"
        @click="selected(item)"
        :class="{ selected: selectTags.indexOf(item) >= 0 }"
      >
        {{ item.name }}
      </li>
    </ul>
    <div>
      <button @click="addTags()">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { Component, Prop } from "vue-property-decorator";
// import store from "../../store/index";
@Component({
  // computed: {
  //   tagList() {
  //     return this.$store.state.tagList;
  //   },
  // },
})
export default class Tags extends vue {
  // tagList = store.fetchTags();
  get tagList() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTags");
  }
  selectTags: string[] = [];
  selected(tag: string) {
    const index = this.selectTags.indexOf(tag);
    if (index >= 0) {
      this.selectTags.splice(index, 1);
    } else {
      this.selectTags.push(tag);
    }
    this.$emit("update:value", this.selectTags);
  }
  addTags() {
    const Tagname = window.prompt("请输入新的标签名！");
    this.$store.commit("createTag", Tagname);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  // border: 1px solid red;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  // background-color: #fff;
  ul {
    // border: 1px solid blue;
    display: flex;
    // align-content: flex-end;
    flex-wrap: wrap;
    li {
      // border: 1px solid gray;
      $bg: #d9d9d9;
      background-color: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin: 4px 5px 2px 16px;
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }
  button {
    color: #999999;
    border: none;
    border-bottom: 1px solid;
    background: transparent;
    font-size: 14px;
    margin: 10px 10px 10px 16px;
  }
}
</style>