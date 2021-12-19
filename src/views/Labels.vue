<template>
  <layout>
    <div class="tags">
      <router-link
        class="link"
        v-for="tag in tagList"
        :key="tag.id"
        :to="`/Labels/EditLabel/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <icon name="right" />
      </router-link>
      <!-- <li v-for="tag in tags" :key="tag">
        <span>{{ tag }}</span>
        <icon name="right" />
      </li> -->
    </div>
    <div class="creatButton">
      <button @click="CreateNewTag">新建标签</button>
    </div>
  </layout>
</template>

<script lang="ts">
import vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import store from "../store/index";
@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList;
    },
  },
})
export default class Labels extends vue {
  created() {
    this.$store.commit("fetchTags");
  }
  // tags = this.$store.state.tagList;
  // @Watch("tags")
  // watchTags() {
  //   console.log("jxm");
  //   console.log(this.tags);
  // }
  CreateNewTag() {
    const Tagname = window.prompt("请输入标签名！");
    this.$store.commit("createTag", Tagname);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  padding-left: 15px;
  background-color: #fff;
  > .link {
    border-bottom: 1px solid #bcbbc1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 44px;
    font-size: 16px;
    svg {
      color: #666;
      margin-right: 15px;
      width: 20px;
      height: 20px;
    }
  }
}
.creatButton {
  text-align: center;
  margin-top: 44-9px;
  button {
    padding: 9px 16px;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 17px;
    background-color: #767676;
  }
}
</style>