/**
 * 校验工具
 */
const validUtil = {
  /**
   * 手机号校验
   * @param mobile 手机号
   * @returns boolean
   */
  mobileValid: (mobile: string | number): boolean => {
    const regExp = new RegExp(/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/)
    return regExp.test(String(mobile))
  }
}
export default validUtil
