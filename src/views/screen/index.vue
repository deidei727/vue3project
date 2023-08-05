<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <div class="top">
        <Top />
      </div>

      <div class="bottom">
        <div class="left">
          <Tour></Tour>
          <Sex></Sex>
          <Age></Age>
        </div>
        <div class="middle">
          <div class="title">
            <!-- <img src="./images/dataScreen-header-warn-bg.png" alt="" /> -->
            <span>平台高峰预警信息（2条）</span>
          </div>

          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank />
          <Year />
          <Counter />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Top from './components/Top.vue'
import Age from './components/Left/Age.vue'
import Sex from './components/Left/Sex.vue'
import Tour from './components/Left/Tour.vue'
import Map from './components/Middle/Map.vue'
import Line from './components/Middle/Line.vue'
import Year from './components/Right/Year.vue'
import Rank from './components/Right/Rank.vue'
import Counter from './components/Right/Counter.vue'
import { useResize } from '@/utils/useResize'
let screenRef = useResize()
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;
  .screen {
    width: 1920px;
    height: 1080px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      padding: 20px 42px 0;
      .left {
        flex: 1.3;
        display: flex;
        margin-right: 20px;
        flex-direction: column;
      }
      .middle {
        flex: 3;
        display: flex;
        flex-direction: column;
        margin-right: 20px;
        position: relative;
        .title {
          flex: 1;
          width: 60%;
          height: 40px;
          position: absolute;
          background: url('./images/dataScreen-header-warn-bg.png') no-repeat ;
          background-size: cover;
          top: 12px;
          left: 220px;
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
        }
        .map {
          flex: 4;
        }
        .line {
          flex: 1.5;
        }
      }
      .right {
        flex: 1.3;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
