<template>
  <Layout title="个人中心" :left-arrow="false" :hide-header="true">
    <div class="action-bar">
      <span class="name">{{ userData.mobile }}</span>
      <div class="icon">
        <van-icon name="fire" @click="changeTheme"/>
        <van-icon style="margin-left: 16px;" name="setting"/>
      </div>
    </div>
    <div class="wrap">
      <van-cell-group inset>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>
    </div>
  </Layout>
</template>
<script setup lang="ts">
import { getUserByToken } from '@/api/login';
import { GetUserByTokenDto } from '@/api/login/type';
import store from '@/store';
import { themeTypeList } from '@/store/modules/view';

defineOptions({
  name: 'TabbarMy',
  inheritAttrs: false
})
const formData = reactive<GetUserByTokenDto>({
  token: store.state.user.token
})

const userData = ref({
  mobile: ''
})

const curTheme = computed(() => store.state.view.theme)

/**
 * 换肤
 */
function changeTheme () {
  let index = themeTypeList.indexOf(curTheme.value)
  if (index === themeTypeList.length - 1) index = 0
  else index += 1
  const nextTheme = themeTypeList[index]
  store.dispatch('setTheme', nextTheme)
}
onMounted(() => {
  getUserByToken(formData).then(response => {
    console.log(response);
    userData.value = response.data || {}
  })
})
</script>
<style lang="less" scoped>
.action-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: @navBarHeight;
  line-height: @navBarHeight;
  background: var(--doc-theme-background-color);
  color: var(--doc-theme-text-color);
  .name {
    margin-left: 12px;
  }
  .icon {
    color: var(--doc-theme-text-color);
    font-size: 20px;
    position: absolute;
    right: 16px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
}
.wrap {
  margin-top: @navBarHeight + 10px;
}
</style>
