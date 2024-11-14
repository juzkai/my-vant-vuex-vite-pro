<template>
  <Layout :left-arrow="false" :hide-header="true" :body-style="bodyStyle">
    <van-search v-model="keywords" autocomplete="off" placeholder="请输入搜索关键词" />
    <div class="content">
      <div class="banner"></div>
    </div>
  </Layout>
</template>
<script setup lang="ts">
import { useStore } from '@/store';

defineOptions({
  name: 'TabbarHome',
  inheritAttrs: false
})
const store = useStore()
store.dispatch('addCacheView', 'TabbarHome')
const keywords = ref('')
const bodyStyle = ref({
  padding: 0,
})
</script>
<style lang="less" scoped>
@searchTop: 0px;
.content {
  margin-top: calc(@searchTop + 56px);
  padding: 10px;
  .banner {
    width: 100%;
    height: 15vh;
    background: var(--van-doc-background-2);
    border-radius: 10px;
  }
}
:deep(.van-search) {
  position: fixed;
  top: @searchTop;
  left: 0;
  right: 0;
}
</style>
