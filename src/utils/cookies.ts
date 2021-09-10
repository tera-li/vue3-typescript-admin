import Keys from '@/constant/key'
import Cookies from 'js-cookie'

export const getSidebarStatus = () => Cookies.get(Keys.sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(Keys.sidebarStatusKey, sidebarStatus)

export const getLanguage = () => Cookies.get(Keys.languageKey)
export const setLanguage = (language: string) => Cookies.set(Keys.languageKey, language)

export const getTime = () => Cookies.get(Keys.languageKey)
export const setTime = (time: string) => Cookies.set(Keys.languageKey, time)

export const getSize = () => Cookies.get(Keys.sizeKey)
export const setSize = (size: string) => Cookies.set(Keys.sizeKey, size)

export const getToken = () => Cookies.get(Keys.tokenKey)
export const setToken = (token: string) => Cookies.set(Keys.tokenKey, token)
export const removeToken = () => Cookies.remove(Keys.tokenKey)

export const getRefreshToken = () => Cookies.get(Keys.refreshTokenKey)
export const setRefreshToken = (token: string) => Cookies.set(Keys.refreshTokenKey, token)
export const removeRefreshToken = () => Cookies.remove(Keys.refreshTokenKey)