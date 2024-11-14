<template>
   <van-field
    v-model.trim="query[codeKey]"
    center
    clearable
    :label="props.codeLabel"
    :label-width="codeWidth"
    :placeholder="props.placeholder"
    :maxlength="maxLength"
    :formatter="props.upperCase? toUpperCaseFormat: undefined"
    autocomplete="off"
  >
    <template #button>
      <van-button :disabled="sendConfig.sending" size="mini" type="success" class="send-code" @click="send">{{ sendConfig.text }}</van-button>
    </template>
  </van-field>
</template>
<script setup lang="ts">
import { MsgCodeType } from '@/typings/common'
import { TimeConstans } from '@/constants/CommonConstants'
import { toUpperCaseFormat } from '@/utils'
import { ComponentInternalInstance } from 'vue';

defineOptions({
  name: 'SmsCode',
  inheritAttrs: false
})
const sendConfig = ref<MsgCodeType>({
  timer: null,
  text: '发送',
  count: TimeConstans.SIXTY_SECOND,
  sending: false
})
const props = defineProps({
  query: {
    type: Object,
    default: () => {}
  },
  // 验证码 label 值
  codeLabel: {
    type: String,
    default: '验证码'
  },
  // 验证码 key值，与 query 同时使用作为绑定
  codeKey: {
    type: String,
    default: 'code'
  },
  // 验证码 label 值
  codeWidth: {
    type: [String, Number],
    default: '6.2em'
  },
  placeholder: {
    type: String,
    default: () => '请输入短信验证码'
  },
  maxLength: {
    type: [String, Number],
    default: 6
  },
  /**
   * 格式化成大写
   */
  upperCase: {
    type: Boolean,
    default: () => true
  }
})
// 触发事件
const emits = defineEmits(['send', 'update:value'])
function send () {
  emits('send')
}
function setCount () {
  if (sendConfig.value.count === 0) {
    sendConfig.value.text = '重新发送'
    sendConfig.value.count = TimeConstans.SIXTY_SECOND
    sendConfig.value.sending = false
    return
  }
  sendConfig.value.count -= 1
  sendConfig.value.text = `${sendConfig.value.count} s`
  sendConfig.value.sending = true
  sendConfig.value.timer = setTimeout(() => {
    setCount()
  }, 1000)
}
function resetCount () {
  sendConfig.value.timer = null
  sendConfig.value.text = '发送'
  sendConfig.value.count = TimeConstans.SIXTY_SECOND
  sendConfig.value.sending = false
}
onMounted(() => {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const proxy = appContext.config.globalProperties
  proxy.$test('1231222223')
})
onUnmounted(() => {
  resetCount()
})
defineExpose({
  setCount,
  resetCount
})
</script>
<style lang="less" scoped>
.send-code {
  width: 80px;
  background: transparent;
  border: none;
  color: var(--doc-theme-text-color);
  font-size: 14px;
}
</style>