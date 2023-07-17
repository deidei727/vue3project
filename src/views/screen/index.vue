<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <Top />
      <div class="bottom">
        <div class="left">
          <Tour></Tour>
          <Sex></Sex>
          <Age></Age>
        </div>
        <div class="middle">
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
  position: relative;
  .screen {
    width: 100%;

    overflow: hidden;
    transform-origin: top;
    .bottom {
      display: flex;
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
      }
      .middle {
        flex: 4;
        display: flex;
        flex-direction: column;
        position: relative;
        .map {
          flex: 4;
        }
        .line {
          flex: 1;
        //   position: relative;

        }
      }
      .right {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
