// import clone from "../lib/clone";
// // record store
// const recordStore = {
//   recordList: [] as RecordItem[],
//   fetchRecords() {
//     this.recordList = JSON.parse(
//       window.localStorage.getItem("recordList") || "[]"
//     );
//     return this.recordList;
//   },
//   saveRecords() {
//     window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
//   },
//   createRecord(record: RecordItem) {
//     const record2 = clone(record);
//     record2.createdAt = new Date().toISOString();
//     this.recordList && this.recordList.push(record2);
//     recordStore.saveRecords();
//   },
// };
// recordStore.fetchRecords();
// export default recordStore;
