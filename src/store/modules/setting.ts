import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLatoutSettingStore = defineStore("SettingStorer", () => {
    const flod = ref(false) //控制菜单折叠还是收起
    const refresh = ref(false)// 控制用户是否刷新














    return {
        flod,
        refresh,
    }

})
export default useLatoutSettingStore