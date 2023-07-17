<template>
  <div class="box4" ref="map">我是地图</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from './china.json'
let map = ref()
console.log(map)
// 注册中国地图
echarts.registerMap('china', chinaJSON as any)

// 页面dom
onMounted(() => {
  // 初始化一下
  let mychart = echarts.init(map.value)
  // 配置echarts的配置项
  mychart.setOption({
    //地图组件
    geo: {
      map: 'china', //中国地图
      roam: true, //鼠标缩放的效果
      //地图的位置调试
      left: 150,
      top: 150,
      right:100,
      zoom: 1.2,
      bottom: 0,
      //地图上的文字的设置
      label: {
        show: true, //文字显示出来
        color: 'white',
        fontSize: 14,
      },

      itemStyle: {
        //每一个多边形的样式
        borderColor: '#29fcff',
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#133a84', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#0c2652', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        opacity: 0.8,
      },
      //地图高亮的效果
      emphasis: {
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#3d80b2', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#1a4892', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        label: {
          fontSize: 40,
          color: 'white',
        },
      },
    },
    //布局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines', //航线的系列
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [119.306239, 26.075302], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 1,
              curveness: 0.3,
            },
          },
          {
            coords: [
              [119.306239, 26.075302], //起点
              [116.405285, 39.904989],  // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 1,
              curveness: 0.3,
            },
          },
        ],
        //开启动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'white',
          symbolSize: 10,
        },
      },
    ],
  })
})
</script>

<style scoped>
</style>
