<template>
  <div ref="root">kkkk</div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  props: ["recordData", "nowTime"],
  data() {
    return {
      Data: this.recordData,
      time: this.nowTime,
      myChartInstance: null,
    };
  },
  watch: {
    nowTime(newtime, oldtime) {
      this.time = newtime;
      this.updateChartsData(
        this.findData()
      )
    },
    deep: true,
  },
  mounted() {
    let width = document.body.clientWidth;
    this.$refs.root.style.width = `${width}px`;
    this.$refs.root.style.height = `${width * 1.2}px`;
    this.myChartInstance = echarts.init(this.$refs.root);

    this.myChartInstance.setOption(
      {
        tooltip: {
          show: true,
        },
        series: [
          {
            type: "pie",
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
    updateChartsData(newData) {
      const prevOption = this.myChartInstance.getOption()
      prevOption.series[0].data = newData
      this.myChartInstance.setOption(prevOption)
    }
  },
};
</script>

<style lang="scss" scoped>
</style>