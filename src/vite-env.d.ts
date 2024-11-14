/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
   /** 应用端口 */
  readonly VITE_APP_PORT: string;
  /** API 基础路径 */
  readonly VITE_APP_BASE_API: string;
  readonly VITE_APP_API_URL: string;
}
declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
// 声明 vuex 模块
declare module 'vuex' {
  export * from 'vuex/types/index.d.ts'
  export * from 'vuex/types/helpers.d.ts'
  export * from 'vuex/types/logger.d.ts'
  export * from 'vuex/types/vue.d.ts'
}

declare module 'qs' {
  export function parse(str: string, options?: any): any
  export function stringify(obj: any, options?: any): string
}

declare module 'js-cookie' {
  export function set(name, value, attributes?): any
  export function get(name): any
  export function remove(name, attributes?): any
}
