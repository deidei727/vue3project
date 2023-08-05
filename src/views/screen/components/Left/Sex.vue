<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man people">
        <img src="../../images/man.png" alt="" />
        <p>男士</p>
      </div>
      <div class="women people">
        <img src="../../images/woman.png" alt="" />
        <p>女士</p>
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
      
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
//获取图形图标的DOM节点
let charts = ref()
onMounted(() => {
  //初始化echarts实例
  let mycharts = echarts.init(charts.value)
  //设置配置项
  mycharts.setOption({
    //组件标题
    title: {
      text: '男女比例', //主标题
      textStyle: {
        //主标题颜色
        color: 'skyblue',
      },
      left: '40%',
      top:'30%'
    },
    //x|y
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [58],
        name:'那是',
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        //调整女士柱条位置
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20,
        },
      },
    ],
    grid: {
      left: 20,
      top: 50,
      right: 10,
      bottom: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.box1 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;

  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .sex {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    .people{
      width: 90px;
      height: 90px;
      margin: 0 40px;
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
      align-items: center;
      color: white;


    }
    .man {
      background: url(../../images/man-bg.png) no-repeat;
      background-size: cover;
    }

    .women {
      background: url(../../images/woman-bg.png) no-repeat;
      background-size: cover;
    }
  }

  .rate {
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
    color: white;
  }

  .charts {
    box-sizing: border-box;
    width: 90%;
    height: 90px;
    // padding: 10px;
  }
}
</style>
