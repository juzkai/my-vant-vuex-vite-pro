<template>
  <Layout title="个人中心">
    <van-button type="success" block style="margin-top: 10px;" @click="back">返回</van-button>
  </Layout>
</template>
<script setup lang="ts">
import { useStore } from '@/store'
const store = useStore()
const router = useRouter()
function back () {
  store.dispatch('deleteCacheView', 'Dashboard')
  router.back()
}
</script>
<style lang="less" scoped>
</style>
