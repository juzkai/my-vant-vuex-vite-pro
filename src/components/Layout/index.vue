<!--
 * components/Layout/index.vue
 * @Description: 页面结构组件
-->
<script setup lang="ts">
import variables  from '@/styles/variables.module.less'
defineOptions({
  name: 'Layout',
  inheritAttrs: false
})
const props = defineProps({
  // body区域样式
  bodyStyle: {
    type: Object,
    default: () => {}
  },
  // 是否隐藏标题栏
  hideHeader: {
    type: Boolean,
    default: () => false
  }
})
const router = useRouter()
// 是否是 tab 页
const tabbarVisible = computed(() => router.currentRoute.value.meta.isTabbar)
// 标题栏高度
const navBarHeight = ref(variables.navBarHeight || 0)
// 底部 tab 栏高度
const tabbarHeight = ref(variables.tabbarHeight || 0)
// 页面默认样式
const defaultBodyStyle = ref({ top: props.hideHeader ? 0 : navBarHeight, bottom: tabbarVisible.value ? tabbarHeight: 0 })
</script>
<template>
  <div class="app-page">
    <slot v-if="!hideHeader" name="header">
      <Header v-bind="$attrs"/>
    </slot>
    <div class="app-page-body" :style="{...defaultBodyStyle, ...props.bodyStyle}">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<style lang="less" scoped>
.app-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  .app-page-body {
    position: absolute;
    left: 0;
    right: 0;
    top: var(--van-nav-bar-height);
    bottom: 0;
    overflow-y: scroll;
  }
}
</style>
