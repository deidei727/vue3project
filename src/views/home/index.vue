<template>
  <div class="layout_container">
    <div class="layout_slider" :class="{ fold: isCollapse ? true : false }">

      <div class="layout_silder_info">
        <img src="../../assets/logo.jpeg" alt="" />
        <p>deidei小店后台管理系统</p>
      </div>
      <transition name="fade">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @select="handleSelect"
          background-color="#001529" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse" router>
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </transition>
    </div>
    <div class="layout_tabbar" :class="{ fold: isCollapse ? true : false }">
      <div class="layout_tabbar_left">
        <el-icon @click="changeIcon">
          <component :is="icon"></component>
        </el-icon>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="item.path"
            v-show="item.meta.title">
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span style="margin: 0 5px">{{ item.meta.title }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="layout_tabbar_right">
        <el-button size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
        <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
        <el-button size="small" icon="Setting" circle></el-button>
        <img :src="userStore.userInfoDate.avatar" style="width: 24px;height: 24px;margin:0px 10px;border-radius: 50%;">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userStore.userInfoDate.username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="layout_main" :class="{ fold: isCollapse ? true : false }">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" v-if="flag" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import Menu from '@/components/menu/index.vue'
import useUserPinia from '@/store/modules/user'
import useLatoutSettingStore from '@/store/modules/setting'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, nextTick } from 'vue'

let userStore = useUserPinia()
let settingStore = useLatoutSettingStore()
let flag = ref(true)
let $router = useRouter()
let $route = useRoute()
let path = ref('')

watch(() => settingStore.refresh, () => {
  // 点击刷新按钮，路由组件进行销毁
  flag.value = false

  // nextTick可以保证在dom都更新完之后进行执行，因为nexttick是微任务
  // 当销毁完毕后，dom更新完了之后，进行展示
  nextTick(() => {
    flag.value = true
  })
})

let icon = ref('Fold')
const isCollapse = ref(true)
const updateRefresh = () => {
  settingStore.refresh = !settingStore.refresh
}
const fullScreen = () => {
  // document.fullscreenElement是dom对象的一个属性，可以用来判断当前是不是全屏模式 结果是true是全屏 null表示不是全屏 (会有浏览器兼容问题)
  // exitFullScreen（）退出全屏模式
  // requestFullscreen()这个方法实现全屏模式
  document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()
}
const changeIcon = () => {
  isCollapse.value = !isCollapse.value
  icon.value = icon.value == 'Fold' ? 'Expand' : 'Fold'
}
const handleSelect = (key: string, keyPath: string[]) => {
  path.value = key
  console.log(key, keyPath)
}
// 退出登录
const loginOut = async () => {
  //第一步：发起请求（退出登录的接口）
  // 第二步：将仓库中相关数据清空token、username等等
  // 第三步：跳转到login页面
  await userStore.userLoginOut()
  $router.push({
    path: '/login', query: {
      redirect: $route.path
    }
  })

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
    overflow: hidden;
    transition: all 0.3s;

    &.fold {
      width: $base-menu-fold-width;
    }

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
    display: flex;
    justify-content: space-between;
    background-color: aqua;
    padding: 10px;

    &.fold {
      width: calc(100% - $base-menu-fold-width);
      left: $base-menu-fold-width;
    }

    &_left {
      display: flex;
      align-items: center;

      .el-breadcrumb {
        margin-left: 15px;
      }
    }

    &_right {
      display: flex;
      align-items: center;
    }
  }

  .layout_main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 10px;

    &.fold {
      width: calc(100% - $base-menu-fold-width);
      left: $base-menu-fold-width;
    }
  }

  .fade-enter-from {
    opacity: 0;
  }

  .fade-enter-active {
    transition: all 0.3s linear;
  }

  .fade-enter-to {
    opacity: 1;
  }
}
</style>
