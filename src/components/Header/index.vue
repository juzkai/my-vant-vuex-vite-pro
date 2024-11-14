<!--
 * components/Header/index.vue
 * @Description: 标题栏
-->
<template >
  <van-nav-bar v-bind="props" @click-left="back"/>
</template>
<script setup lang="ts">
defineOptions({
  name: 'Header',
  inheritAttrs: false
})
const router = useRouter()
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 左侧文案
  leftText: {
    type: String,
    default: ''
  },
  // 右侧文案
  rightText: {
    type: String,
    default: ''
  },
  // v4.6.8, 是否禁用左侧按钮，禁用时透明度降低，且无法点击
  leftDisabled: {
    type: Boolean,
    default: false
  },
  // v4.6.8, 是否禁用右侧按钮，禁用时透明度降低，且无法点击
  rightDisabled: {
    type: Boolean,
    default: false
  },
  // 是否显示左侧箭头
  leftArrow: {
    type: Boolean,
    default: true
  },
  // 是否显示下边框
  border: {
    type: Boolean,
    default: false
  },
  // 是否固定在顶部
  fixed: {
    type: Boolean,
    default: true
  },
  // 固定在顶部时，是否在标签位置生成一个等高的占位元素
  placeholder: {
    type: Boolean,
    default: false
  },
  // 导航栏 z-index
  zIndex: {
    type: [Number, String],
    default: 1
  },
  // 是否开启顶部安全区适配
  safeAreaInsetTop: {
    type: Boolean,
    default: true
  },
  // 是否开启两侧按钮的点击反馈
  clickable: {
    type: Boolean,
    default: false
  },
})
function back () {
  router.back()
}
</script>
<style lang="less" scoped>
</style>
