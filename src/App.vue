<script setup lang="ts">
import TarbarIndex from '@/views/tabbar/index.vue'
import type { RouteRecordNameGeneric } from 'vue-router'
import { useStore } from '@/store'
import { localStorageUtil } from '@/utils/storageUtil'
import { LocalStorageMark } from '@/constants/StorageMark'

const router = useRouter()

const store = useStore()
// 本地存储key
const viewPageListName = ref('viewPageList')
// 本地存储
const viewPageList = reactive<RouteRecordNameGeneric[]>([])
// 切换动画
const slideTransition = ref('slide-left')
// 页面缓存
const cacheView = computed(() => store.state.view.cacheView)
const theme = computed(() => store.state.view.theme)
// 设置主题
function setTheme () {
  const localTheme = localStorageUtil.getItem(LocalStorageMark.THEME)
  if (theme.value !== localTheme) store.dispatch('setTheme', localTheme)
}

onBeforeMount(() => {
  setTheme()
}),

// 监测路由
watch(
  () => router.currentRoute.value,
  (to, from) => {
    if (to.name === from?.name) return
    if (!viewPageList || viewPageList.length === 0) {
      let viewPageList = sessionStorage.getItem(viewPageListName.value)
      if (viewPageList) {
        viewPageList = JSON.parse(viewPageList)
      }
    }
    if (viewPageList.indexOf(to.name) === -1) {
      viewPageList.push(to.name)
    }
    if (viewPageList.indexOf(to.name) > viewPageList.indexOf(from?.name)) {
      slideTransition.value = 'slide-left'
    } else {
      slideTransition.value = 'slide-right'
    }
    if (viewPageList.indexOf(from?.name) === viewPageList.length - 1) {
      viewPageList.splice(viewPageList.indexOf(from?.name), 1)
    }
    sessionStorage.setItem(viewPageListName.value, JSON.stringify(viewPageList))
  },
  { immediate: true }
)
</script>

<template>
  <van-config-provider :theme="theme">
    <!-- <router-view> can no longer be used directly inside <transition> or <keep-alive>. -->
    <router-view v-slot="{ Component, route }">
      <transition :name="slideTransition" mode="in-out">
        <keep-alive :include="cacheView">
          <component :is="Component" :key="route.path"/>
        </keep-alive>
      </transition>
    </router-view>
    <TarbarIndex />
  </van-config-provider>
</template>
<style scoped>
</style>
