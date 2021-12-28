<template>
  <div>
    <div ref="root" class="root" v-show="showModule()"></div>
    <div v-show="!showModule()">
      <div for="" class="label">
        <icon name="NoData" />
      </div>
      <div class="link">
        <div>暂无数据</div>
        <div class="buttonlink">
          <router-link to="/Money" class="selected"> 记一笔 </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
import clone from "../lib/clone";
export default {
  props: ["recordData", "nowTime", "nowType"],
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      // Data: this.recordData,
      Data: clone(this.$store.state.recordList),
      time: this.nowTime,
      type: this.nowType,
      myChartInstance: null,
    };
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    nowTime(newtime) {
      this.time = newtime;
      this.updateChartsData(this.findData());
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    nowType(newtype) {
      this.type = newtype;
      this.updateChartsData(this.findData());
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  beforeCreate() {
    this.$store.commit("fetchRecords");
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    let width = document.body.clientWidth;
    this.$refs.root.style.width = `${width}px`;
    this.$refs.root.style.height = `${width * 1.2}px`;
    this.myChartInstance = echarts.init(this.$refs.root);

    this.myChartInstance.setOption({
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
    });
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    showModule() {
      if (this.findData().length > 0) {
        return true;
      } else {
        return false;
      }
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    findData() {
      if (this.Data.length < 0) {
        return [];
      }
      let resultData = [];
      let filterData = [];
      let inputTime = dayjs(this.nowTime).format("YYYY-MM-DD");
      filterData = this.Data.filter(
        (item) => item.type === this.type && item.createdAt === inputTime
      );
      filterData.forEach((item) => {
        resultData.push({ value: item.number, name: item.tags[0].name });
      });
      return resultData;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    updateChartsData(newData) {
      const prevOption = this.myChartInstance.getOption();
      prevOption.series[0].data = newData;
      this.myChartInstance.setOption(prevOption);
    },
  },
  // methods: {
  //   // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  //   showModule() {
  //     if (this.findData().length > 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  //   // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  //   findData() {
  //     if (this.Data.length === 0) {
  //       return [];
  //     }
  //     let resultData = [];
  //     let inputTime = dayjs(this.nowTime).format("YYYY-MM-DD");
  //     let currentItem = [];
  //     console.log(this.Data);
  //     // this.Data.filter((t) => t.type === this.Type);
  //     for (let i = 0; i < this.Data.length; i++) {
  //       if (dayjs(this.Data[i].title).format("YYYY-MM-DD") === inputTime) {
  //         // console.log("选出了相同时间的数据");
  //         // console.log(this.Data[i]);
  //         // console.log(this.Data[i].items);
  //         this.Data[i].items.forEach((t) => currentItem.push(t));
  //       }
  //     }
  //     // console.log("我是current");
  //     // console.log(currentItem);
  //     currentItem.filter((t) => t.type === this.Type);
  //     console.log("我是分类的");
  //     console.log(this.currentItem);
  //     currentItem.forEach((t) =>
  //       resultData.push({
  //         value: t.number,
  //         name: t.tags[0].name,
  //       })
  //     );
  //     // console.log(resultData);
  //     return resultData;
  //   },
  //   // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  //   updateChartsData(newData) {
  //     const prevOption = this.myChartInstance.getOption();
  //     prevOption.series[0].data = newData;
  //     this.myChartInstance.setOption(prevOption);
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.label {
  // border: 1px solid red;
  text-align: center;
  margin-top: 100px;
  .icon {
    width: 50px;
    height: 80px;
  }
}
.link {
  display: flex;
  flex-direction: column;
  align-items: center;
  .buttonlink {
    // border: 1px solid red;
    margin-top: 5px;
    // background-color: #c4c4c4;
    background-color: rgb(230, 230, 230);
    width: 80px;
    .selected {
      display: block;
      width: 80px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>