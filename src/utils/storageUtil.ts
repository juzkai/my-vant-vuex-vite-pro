/**
 * 存储
 */

import Cookie from 'js-cookie'

// 可存储的值的类型
type storageType = null | undefined | string | number | boolean | object

/**
 * localStorage 缓存
 */
export const localStorageUtil = {
  setItem (mark: string, item: storageType) {
    if (typeof item === 'object') localStorage.setItem(mark, JSON.stringify(item))
    else localStorage.setItem(mark, String(item))
  },
  getItem (mark: string) {
    let item = ''
    let localItem = localStorage.getItem(mark) || ''
    try {
      if (localItem) item = JSON.parse(localItem)
    } catch (error) {
      item = localItem
    }
    return item
  },
  clearItem (mark: string): void {
    this.setItem(mark, '')
  },
  clearAll (): void {
    localStorage.clear()
  }
}

/**
 * sessionStorage 缓存
 */
export const sessionStorageUtil = {
  setItem (mark: string, item: storageType) {
    if (typeof item === 'object') sessionStorage.setItem(mark, JSON.stringify(item))
    else sessionStorage.setItem(mark, String(item))
  },
  getItem (mark: string) {
    let item = ''
    let localItem = sessionStorage.getItem(mark) || ''
    try {
      if (localItem) item = JSON.parse(localItem)
    } catch (error) {
      item = localItem
    }
    return item
  },
  clearItem (mark: string): void {
    sessionStorage.removeItem(mark)
  },
  clearAll (): void {
    sessionStorage.clear()
  }
}

/**
 * Cookie 缓存
 */
export const cookieUtil = {
  setItem (mark: string, item: storageType, opt = {}) {
    if (typeof item === 'object') Cookie.set(mark, JSON.stringify(item), opt)
    else Cookie.set(mark, String(item))
  },
  getItem (mark: string) {
    let item = ''
    let localItem = Cookie.get(mark) || ''
    try {
      if (localItem) item = JSON.parse(localItem)
    } catch (error) {
      item = localItem
    }
    return item
  },
  clearItem (mark: string, opt = {}): void {
    Cookie.remove(mark, opt)
  },
  clearAll (): void {
    var cookies = document.cookie.split(";")
    try {
      for (let i = 0; i < cookies.length; i++) {
        this.clearItem(cookies[i])
      }
    } catch (error) {
    }
  }
}