<script setup lang="ts">
// import {Plus} from '@element-plus/icons-vue'
// import SvgIcon from './components/SvgIcon/index.vue';
// import weclome from './assets/icons/welcome.svg';
// import request from './utils/request.ts'
// request({
//     url:'/user/login',
//     method:'post',
//     data:{
//         username:'admin',
//         password:'11111'
//     }
// }).then((result) => {
//   console.log(result)
// }).catch((err) => {
//   console.log(err)
// });
// import { reqLogin } from './api/user'
// // import { onMounted } from 'vue';
// // onMounted(()=>{
//   reqLogin({username:'admin', password:'111111'})

// // })

</script>

<template>
  <div>
    <!-- <SvgIcon name="lock" width="20px" height="20px"></SvgIcon>
    <SvgIcon name="lock" width="40px" height="40px"></SvgIcon> -->

   <router-view></router-view>
    <!-- <SvgIcon name="phone"  color="red"></SvgIcon> -->
    <!-- <page></page>
    <svg>
      <use xlink:href="#icon-welcome"></use>
    </svg>
    -->

    </div>
</template>

<style scoped lang="scss">
*{
color: $color;
}
</style>
