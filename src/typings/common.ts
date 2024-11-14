/**
 * 验证码发送
 */
export interface MsgCodeType {
  // 定时器
  timer?: number | null | undefined,
  // 倒计时
  count: number,
  // 发送按钮文本
  text: string,
  // 发送状态
  sending: boolean
}
