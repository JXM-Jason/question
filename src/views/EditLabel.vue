<template>
  <layout>
    <div class="labelTitle">
      <router-link to="/Labels" class="link" active-class="selected">
        <icon name="left" />
      </router-link>
      <span> 编辑标签 </span>
    </div>
    <!-- <div class="labelName">
      <span> 标签名&nbsp; &nbsp;{{ "jxm" }}</span>
    </div> -->
    <div class="labelName">
      <Notes
        :value="tag.name"
        fieldname="标签名"
        placeholder="请输入标签名"
        @update:value="onUpdateTagname"
      />
    </div>
    <button class="deleteButton" @click="DeleteNewTag">删除标签</button>
  </layout>
</template>

<script lang="ts">
import vue from "vue";
import { Component } from "vue-property-decorator";
import Notes from "../components/money/Notes.vue";
import tagListModel from "../models/tagListModels";
@Component({ components: { Notes } })
export default class EditLabel extends vue {
  tag: { id: string; name: string } = { id: "", name: "" };
  $route: any;
  $router: any;
  created() {
    const id = this.$route.params.id;
    console.log("id");
    console.log(id);

    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      this.tag = tag;
      console.log(this.tag);
    } else {
      this.$router.replace("/404");
    }
  }
  onUpdateTagname(name: string) {
    if (this.tag) {
      tagListModel.update(this.tag.id, name);
    }
  }
  DeleteNewTag() {
    if (this.tag) {
      if (tagListModel.remove(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert("删除失败");
      }
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>
<style lang="scss" scoped>
.labelTitle {
  //   border: 1px solid red;
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
  background-color: #fff;
  > .link {
    margin-left: 24px;
  }
  span {
    position: absolute;
    line-height: 18px;
    height: 20px;
    left: 50%;
    top: 30%;
    transform: translate(-50%);
  }
}
// .labelName {
//   background-color: #fff;
//   //   border: 1px solid blue;
//   margin-top: 8px;
//   height: 44px;
//   display: flex;
//   align-items: center;
//   span {
//     margin-left: 20px;
//   }
// }
.labelName {
  background-color: #fff;
  margin-top: 8px;
}

.deleteButton {
  width: 98px;
  height: 40px;
  background-color: #767676;
  border: none;
  border-radius: 4px;
  color: white;
  position: absolute;
  left: 50%;
  top: 88%;
  transform: translate(-50%);
}
</style>