<template>
  <Layout :title="headerName" :body-style="{ padding: 0 }">
    <van-form>
      <van-cell-group inset class="login-form">
        <div class="title">{{ title }}</div>
        <van-field v-model.trim="formData.mobile" label="手机号" type="tel" autocomplete="off" placeholder="请输入手机号" />
        <van-field
          v-if="passwordShow"
          v-model.trim="formData.password"
          :type="pswType"
          :right-icon="pswRightIcon"
          label="密码"
          autocomplete="off"
          placeholder="请输入密码"
          @click-right-icon="openEye"
        />
        <SmsCode v-if="msgCodeShow" ref="SmsCodeRef" :query="formData" code-key="msgCode" @send="send"/>
        <div style="padding: 40px 10% 0;margin-top: 30px;">
          <van-button v-if="isRegister" type="success" round block @click="registerClick">注册</van-button>
          <van-button v-else-if="isForgotPassword" type="success" round block @click="resetClick">重置密码</van-button>
          <van-button v-else type="success" round block @click="login">登录</van-button>
        </div>
        <div class="register">
          <span v-if="!isLoginByPassword" class="item" @click="setActionState(ACTION_STATE.LOGIN_BY_PASSWORD)">密码登录</span>
          <span v-if="!isRegister" class="item" @click="setActionState(ACTION_STATE.REGISTER)">注册账号</span>
          <span v-if="!isLoginByMsgCode" class="item" @click="setActionState(ACTION_STATE.LOGIN_BY_MSG_CODE)">验证码登录</span>
          <span v-if="!isForgotPassword" class="item" @click="setActionState(ACTION_STATE.FORGOT_PASSWORD)">忘记密码</span>
        </div>
      </van-cell-group>
    </van-form>
  </Layout>
</template>
<script setup lang="ts">
import { loginIn, sendMsg, sendRegisterMsg, userRegister, loginByMsgCode, resetPassword } from '@/api/login'
import { LoginInDto } from '@/api/login/type'
import validUtil from '@/utils/valid'
import store from '@/store'
import { ComponentInternalInstance } from 'vue';

defineOptions({
  name: 'Login',
  inheritAttrs: false
})

const SmsCodeRef = ref()

/**
 * 操作状态
 */
const ACTION_STATE = {
  /**
   * 手机号密码登录
   */
  LOGIN_BY_PASSWORD: 1,
  /**
   * 手机号验证码登录
   */
  LOGIN_BY_MSG_CODE: 2,
  /**
   * 注册账号
   */
  REGISTER: 3,
   /**
   * 忘记密码
   */
  FORGOT_PASSWORD: 4
}
const router = useRouter()
const title = ref(import.meta.env.VITE_APP_TITLE)
// 密码显隐状态
const pswState = ref(true)
const actionState = ref(ACTION_STATE.LOGIN_BY_PASSWORD)

const isLoginByPassword = computed((): boolean => actionState.value === ACTION_STATE.LOGIN_BY_PASSWORD)
const isLoginByMsgCode = computed((): boolean => actionState.value === ACTION_STATE.LOGIN_BY_MSG_CODE)
const isRegister = computed((): boolean => actionState.value === ACTION_STATE.REGISTER)
const isForgotPassword = computed((): boolean => actionState.value === ACTION_STATE.FORGOT_PASSWORD)
// 显示密码
const passwordShow = computed((): boolean => isLoginByPassword.value || isRegister.value || isForgotPassword.value)
// 显示发送验证码
const msgCodeShow = computed((): boolean => isLoginByMsgCode.value || isRegister.value || isForgotPassword.value)
// 标题栏名称
const headerName = computed((): string => {
  let name: string = ''
  if (isRegister.value) name = '注册'
  else if (isForgotPassword.value) name = '忘记密码'
  else name = '登录'
  return name
})

// 密码框类型
const pswType = computed(() => {
  return pswState.value ? 'password' : 'text'
})
// 密码显隐图标
const pswRightIcon = computed(() => {
  return pswState.value ? 'closed-eye' : 'eye-o'
})
// 提交数据
const formData = reactive<LoginInDto>({
  mobile: '',
  password: '',
  msgCode: ''
})
function checkMobile () {
  return new Promise(resolve => {
    if (!formData.mobile) return showDialog({ message: '请输入手机号' })
    if (!validUtil.mobileValid(formData.mobile)) return showDialog({ message: '手机号格式不正确' })
    resolve(null)
  })
}
/**
 * 登录
 */
async function login () {
  await checkMobile()
  if (isLoginByPassword.value && !formData.password) return showDialog({ message: '请输入密码' })
  if (isLoginByMsgCode.value && !formData.msgCode) return showDialog({ message: '请输入验证码' })
  const login = isLoginByPassword.value ? loginIn : loginByMsgCode
  login(formData).then(response => {
    console.log(response);
    const token = response.data || ''
    if (token) {
      store.dispatch('setToken', token).then(() => {
        showToast('登录成功')
        router.replace('/tabbar/home')
      })
    }
  })
}
/**
 * 切换密码显隐状态
 */
function openEye () {
  pswState.value = !pswState.value
}
/**
 * 发送验证码
 */
async function send () {
  await checkMobile()
  const send = isRegister.value ? sendRegisterMsg : sendMsg
  send({mobile: formData.mobile}).then(response => {
    SmsCodeRef.value.setCount()
    showToast('发送成功')
    console.log(response);
  })
}
/**
 * 按钮切换
 * @param state
 */
function setActionState (state: number) {
  formData.msgCode = ''
  formData.password = ''
  actionState.value = state
}
/**
 * 注册
 */
async function registerClick () {
  await checkMobile()
  if (!formData.password) return showDialog({ message: '请输入密码' })
  if (!formData.msgCode) return showDialog({ message: '请输入验证码' })
  userRegister(formData).then(() => {
    showToast('注册成功')
    formData.password = ''
    formData.msgCode = ''
    setActionState(ACTION_STATE.LOGIN_BY_PASSWORD)
  })
}
/**
 * 重置密码
 */
async function resetClick () {
  await checkMobile()
  if (!formData.password) return showDialog({ message: '请输入密码' })
  if (!formData.msgCode) return showDialog({ message: '请输入验证码' })
  resetPassword(formData).then(() => {
    showToast('重置成功')
    formData.password = ''
    formData.msgCode = ''
    setActionState(ACTION_STATE.LOGIN_BY_PASSWORD)
  })
}

const { appContext } = getCurrentInstance() as ComponentInternalInstance
const proxy = appContext.config.globalProperties
proxy.$test('123123')

</script>
<style lang="less" scoped>
.login-form {
  position: relative;
  top: 16px;
  padding: 20px 0px;
  .title {
    color: var(--doc-text-title-color);
    font-size: 30px;
    text-align: center;
    padding: 75px 0px;
    font-weight: bold;
    text-shadow: 1px 2px 3px #999999;
  }
  .register {
    margin-top: 30px;
    margin-bottom: 40px;
    text-align: center;
  }
  .item {
    color: var(--doc-text-title-color);
    padding: 0px 10px;
  }
}
</style>
