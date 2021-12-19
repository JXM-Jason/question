import createID from "../lib/createID";
const tagStore = {
  // tag store
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]");
    return this.tagList;
  },
  //增加
  createTag(name: string) {
    const names = this.tagList.map((t) => t.name);
    if (names.indexOf(name) >= 0) {
      window.alert("标签名重复了");
      return "duplicated";
    } else if (name === "") {
      window.alert("标签名不能为空");
    } else if (name === null) {
      return;
    } else {
      const id = createID().toString();
      this.tagList.push({ id: id, name: name });
      this.saveTags();
      window.alert("添加成功");
      return "success";
    }
  },
  saveTags() {
    window.localStorage.setItem("tagList", JSON.stringify(this.tagList));
  },
  //删除
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },
  //修改
  updateTag(id: string, name: string) {
    const idList = this.tagList.map((t) => t.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map((t) => t.name);
      if (names.indexOf(name) >= 0) {
        return "duplicated";
      } else {
        const tag = this.tagList.filter((t) => t.id === id)[0];
        tag.name = name;
        this.saveTags();
        return "success";
      }
    } else {
      return "not found";
    }
  },
  //查找
  findTag(id: string) {
    return this.tagList.filter((t) => t.id === id)[0];
  },
};
tagStore.fetchTags();
export default tagStore;
