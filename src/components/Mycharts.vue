<template>
  <div ref="root">kkkk</div>
</template>

<script>
import vue from "vue";
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  props: ["recordData", "nowTime"],
  data() {
    return {
      Data: this.recordData,
      time: this.nowTime,
    };
  },
  watch: {
    Time(newtime, oldtime) {
      console.log("我是watch的time");
      console.log(oldtime);
      console.log(newtime);
      this.time = newtime;
    },
    deep: true,
  },
  created() {
    // console.log("我是created");
    // console.log(this.time);
    this.$emit("update:time", this.time);
    console.log("我是data");
    console.log(this.Data);
    console.log("我是新建时间ISO化");
    console.log(new Date().toISOString());
    console.log("我是日历时间");
    console.log(this.nowTime);
    // console.log("我是dayjs封装时间");
    // console.log(dayjs(this.nowTime));
    // console.log("我是日历format化");
    // console.log(dayjs(this.nowTime).format("YYYY-MM-DD"));
    // console.log(dayjs(this.nowTime).format("YYYY-MM-DD").valueOf());
    // console.log("我是title");
    // console.log(this.Data[6].title);
    // console.log("比较");
    // console.log(
    //   dayjs(this.Data[6].title).format("YYYY-MM-DD") ===
    //     dayjs(this.nowTime).format("YYYY-MM-DD")
    // );
    // console.log("我是方法");
    this.findData();
  },
  mounted() {
    let width = document.body.clientWidth;
    this.$refs.root.style.width = `${width}px`;
    this.$refs.root.style.height = `${width * 1.2}px`;
    let myChart = echarts.init(this.$refs.root);

    myChart.setOption(
      {
        tooltip: {
          show: true,
        },
        series: [
          {
            type: "pie",
            // data: [
            //   {
            //     value: 335,
            //     name: "直接访问",
            //   },
            //   {
            //     value: 234,
            //     name: "联盟广告",
            //   },
            //   {
            //     value: 1548,
            //     name: "搜索引擎",
            //   },
            // ],
            data: this.findData(),
            radius: "50%",
          },
        ],
      },
      true
    );
  },

  methods: {
    findData() {
      if (this.Data.length === 0) {
        return [];
      }
      let resultData = [];
      // const newData = this.Data.filter((t) => t.type === this.type).filter(
      //   (item) => {
      //     dayjs(item.title).format("YYYY-MM-DD") ===
      //       dayjs(this.nowTime).format("YYYY-MM-DD");
      //     // console.log(item.title);
      //   }
      // );
      // console.log(newData);
      // return newData;
      // let newData = this.Data.filter((t) => t.type === this.type);
      // console.log(newData);
      let inputTime = dayjs(this.nowTime).format("YYYY-MM-DD");
      let currentItem = [];
      for (let i = 0; i < this.Data.length; i++) {
        if (dayjs(this.Data[i].title).format("YYYY-MM-DD") === inputTime) {
          console.log("选出了相同时间的数据");
          console.log(this.Data[i]);

          console.log(this.Data[i].items);
          this.Data[i].items.forEach((t) => currentItem.push(t));
        }
      }
      console.log("我是current");
      console.log(currentItem);
      currentItem.forEach((t) =>
        resultData.push({
          value: t.number,
          name: t.tags[0].name,
        })
      );
      console.log(resultData);
      return resultData;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>