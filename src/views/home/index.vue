<template>
  <div class="layout_container">
    <div class="layout_slider">
      <div class="layout_silder_info">
        <img src="../../assets/logo.jpeg" alt="" />
        <p>deidei小店后台管理系统</p>
      </div>
      
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <Menu :menuList="userStore.menuRoutes"></Menu>
    </el-menu>
    </div>
    <div class="layout_tabbar">
      <el-main>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>promotion management</el-breadcrumb-item>
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
      </el-main>
    </div>
    <div class="layout_main">
      <!-- <p style="height: 1000px">nsjhid</p> -->

    
        <router-view></router-view>
        <p style="height: 1000px">nsjhid</p>
      <!-- </template> -->
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import Menu from '@/components/menu/index.vue'
import useUserPinia from '@/store/modules/user'
let userStore = useUserPinia()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  position: relative;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    position: fixed;
    .layout_silder_info {
      padding: 15px;
      display: flex;
      align-items: center;
      font-size: 16px;
      color: white;
      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 50%;
      }
    }
  }
  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    position: fixed;
    top: 0;
    left: $base-menu-width;
  }
  .layout_main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
  }
}
</style>
