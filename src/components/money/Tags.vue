<template>
  <div class="tags">
    <ul>
      <li
        v-for="item in TagList"
        :key="item.id"
        @click="selected(item)"
        :class="{ selected: selectTags.indexOf(item) >= 0 }"
      >
        <div class="parcel">
          <icon :name="item.name" />
          <span>{{ item.name }}</span>
        </div>
      </li>
      <li class="lastli" @click="addTags()">
        <icon name="添加" />
        <button>新增</button>
      </li>
    </ul>
    <!-- {item.name:true,"收入":this.Type==="+","支出":this.Type==="+"} -->
    <!-- <div>
      <button @click="addTags()">新增标签</button>
    </div> -->
  </div>
</template>

<script lang="ts">
import clone from "@/lib/clone";
import vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  // computed: {
  //   tagList() {
  //     return this.$store.state.tagList;
  //   },
  // },
})
export default class Tags extends vue {
  @Prop(String) Type = "-";
  // tagList = store.fetchTags();
  @Watch("Type")
  onTypechange(newType: string, oldType: string) {
    this.Type = newType;
    // console.log(this.Type);
  }

  get tagList() {
    return this.$store.state.tagList;
  }
  get TagList() {
    //这是按照类型过滤后的数据
    return this.findType();
  }
  beforecreated() {
    this.$store.commit("fetchTags");
  }
  selectTags: string[] = [];
  selected(tag: string) {
    const index = this.selectTags.indexOf(tag);
    if (index >= 0) {
      this.selectTags.splice(index, 1);
    } else {
      if (this.selectTags.length < 4) {
        this.selectTags.push(tag);
      } else {
        alert("最多选择4个标签！");
      }
    }
    this.$emit("update:value", this.selectTags);
  }
  addTags() {
    const Tagname = window.prompt("请输入新的标签名！");
    const tagType = this.Type;
    this.$store.commit("createTag", [Tagname, tagType]);
  }
  findType() {
    const TypeData = clone(this.tagList).filter(
      (item: any) => item.type === this.Type
    );
    return TypeData;
  }
}
</script>

<style lang="scss" scoped>
.tags {
  // border: 1px solid red;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // background-color: #fff;
  .lastli {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      width: 20px;
      height: 20px;
    }
    button {
      color: #333;
      border: none;
      background: transparent;
      font-size: 14px;
      text-align: center;
      margin-top: 2px;
    }
  }
  ul {
    // border: 1px solid blue;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    // align-items: start;
    li {
      // border: 1px solid gray;
      width: 80px;
      $bg: #d9d9d9;
      background-color: $bg;
      $h: 24px;
      height: $h * 2.5;
      // line-height: 35px;
      border-radius: $h/2;
      padding: 0 16px;
      margin: 10px 6px 2px 4px;
      text-align: center;

      .parcel {
        // border: 1px solid blue;
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          font-size: 22px;
        }
        span {
          // border: 1px solid red;
          font-size: 16px;
        }
      }

      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }
}
</style>