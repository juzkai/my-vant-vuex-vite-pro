<template>
  <Layout title="首页" :left-arrow="false" :bottom-tabbar="true">
    <van-button type="success" block style="margin-top: 10px;" @click="next">{{ userId }}</van-button>
    <van-button type="success" block style="margin-top: 10px;" @click="toNextPage">跳转</van-button>
    <van-button type="success" block style="margin-top: 10px;" @click="changeTheme">切换主题</van-button>
    <van-button type="success" block style="margin-top: 10px;" @click="infoGet">接口请求</van-button>
    <van-field v-model="textValue" label="文本" placeholder="请输入用户名" />
    <van-button type="success" block style="margin-top: 10px;" @click="nameGet">接口请求</van-button>
    <van-cell title="单元格" value="内容" />
  </Layout>
</template>
<script setup lang="ts">
import { getUserInfo, getName } from '@/api/user'
import { useStore } from '@/store'
import { onBeforeRouteLeave } from 'vue-router'
import variables  from '@/styles/variables.module.less'
import classes from '@/styles/style.module.css'
import { AxiosResponse } from 'axios'
console.log(variables)
console.log(classes)

const router = useRouter()
const store = useStore()
defineOptions({
  name: 'Dashboard',
  inheritAttrs: false
})

const textValue = ref('')
const userId = computed(() => store.state.view.userId)
const theme = computed(() => store.state.view.theme)
function next () {
  store.dispatch('changeUserId', '111')
}
function toNextPage () {
  router.push('/home')
}
function changeTheme () {
  const nextTheme = theme.value === 'light' ? 'dark' : 'light'
  store.dispatch('setTheme', nextTheme)
}
function infoGet () {
  getUserInfo().then((response: AxiosResponse) => {
    console.log(response)
  })
}
function nameGet () {
  getName({ age: textValue.value }).then((response: AxiosResponse) => {
    console.log(response)
  })
}
onBeforeRouteLeave((to, _from, next) => {
  if (to.name === 'Home') {
    store.dispatch('addCacheView', 'TabbarIndex')
    store.dispatch('addCacheView', 'Dashboard')
  }
  next()
})
</script>
<style lang="less" scoped>
</style>
