import { ref, onMounted, onBeforeUnmount,watch } from 'vue'
import { debounce } from './debounce'
type ResizeTypes = {
  w?: number
  h?: number
  fullScreen?: boolean
  delay?: number
}
export const width = 1920
export const height = 1080

// 导出大屏适配函数
export const useResize = (options: ResizeTypes = {}) => {
  const { w = width, h = height, fullScreen = false, delay = 60 } = options

  const screenRef = ref()
  const scale = ref(1)

  function resize() {
    const clientWidth =  document.body.clientWidth
    const clientHeight = document.body.clientHeight

    const scaleW = clientWidth / w
    const scaleH = clientHeight / h
    //   / 判断当前的宽高比和默认的宽高比大小
    if (scaleW<scaleH) {
      scale.value = scaleW
    } else {
      scale.value = scaleH
    }
    if (fullScreen) {
      // 全屏:
      screenRef.value.style.transform = `scale(${scaleW}, ${scaleH})`
    } else {
      // 选择适配比例缩放
      screenRef.value.style.transform = 'scale(' + scale.value + ') '
    }
  }

  //   考虑防抖问题
  const resizeDelay = debounce(resize, delay)
  //   页面一进来就加载
  onMounted(() => {
    if (screenRef.value) {
      resize()
      window.addEventListener('resize', resizeDelay)
    }
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeDelay)
    
  })

  return screenRef
}
