<template>
  <div v-show="tabbarVisible" class="app-tab">
    <van-tabbar v-model="active">
      <van-tabbar-item v-for="bar in tabbarList" :key="bar.name" :to="bar.path" replace :name="String(bar.name)" :icon="String(bar.meta?.icon || '')" >{{ bar.meta?.title }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script setup lang="ts">
import tabbarRouter from '@/router/modules/tabbar'
defineOptions({
  name: 'TabbarIndex',
  inheritAttrs: false
})
// 获取 tabbar 路由数据
const tabbarList = ref(tabbarRouter)
const router = useRouter()
// 根据当前路由名称设置 tabbar选中
const currentRoute = computed(() => router.currentRoute.value)
const active = computed(() => String(currentRoute.value.name))
const tabbarVisible = computed(() => currentRoute.value.meta.isTabbar)
</script>
<style lang="less" scoped>
</style>
