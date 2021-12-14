import clone from "@/lib/clone";

const recordList = {
  data: [] as RecordItem[],
  // clone() {
  //   return JSON.parse(window.localStorage.getItem("recordList"));
  // },
  create(record: RecordItem) {
    const record2 = clone(record);
    record2.createdAt = new Date();
    this.data.push(record2);
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem("recordList") || "[]");
    return this.data;
  },
  save() {
    window.localStorage.setItem("recordList", JSON.stringify(this.data));
  },
};
export default recordList;
