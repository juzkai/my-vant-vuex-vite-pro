/**
 * vant 相关默认配置
 */
import { setDialogDefaultOptions, setToastDefaultOptions } from 'vant'
export default {
  init () {
    // showDialog 默认配置
    setDialogDefaultOptions({
      title: '提示',
      width: '80%'
    })
    // showToast 默认配置
    setToastDefaultOptions({
      message: '加载中...',
      duration: 2000,
      loadingType: 'spinner'
    })
  }
}
