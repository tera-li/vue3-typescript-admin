import router from '@/router'
import { useStore } from '@/store'
import { ContentType, Method, RequestParams } from './type'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import DuplicateRequest from './duplicate'
import { UserActionTypes } from '@/store/modules/user/action-types'

// import {
//   getRefreshToken,
//   getTime,
//   setRefreshToken,
//   setTime,
//   setToken
// } from '@/utils/cookies'
// import { UserMutationTypes } from '@/store/modules/user/mutation-types'
// import { RootObject } from '@/model/rootObject'
// import { getRefresh } from '@/apis/user'
// import { RefreshModel } from '@/model/userModel'

export * from './type'

export interface HttpClientConfig extends AxiosRequestConfig {
  defaultParams?: RequestParams
  // click interval (点击间隔时间)
  clickInterval?: number
}

export default class HttpClient {
  private _httpClient: AxiosInstance
  private readonly _defaultConfig: HttpClientConfig
  private _countRequest: number

  constructor(options: HttpClientConfig = {}) {
    this._httpClient = axios.create(options)
    this._defaultConfig = options
    this._countRequest = 0
  }

  /**
   * @description: 封装请求类
   * @param {Method} method 请求方式
   * @param {APIPath} path 请求路径
   * @param {RequestParams} params 参数
   * @param {ContentType} contentType http配置
   * @param {RequestOptions} optionsSource
   * @return {*}
   */
  async request<T>(
    path: string,
    method: Method = Method.GET,
    params?: RequestParams,
    contentType: ContentType = ContentType.json,
    optionsSource?: HttpClientConfig
  ) {
    const options: HttpClientConfig = Object.assign(
      {},
      this._defaultConfig,
      optionsSource
    )
    const {
      baseURL,
      headers
    } = options
    headers['content-type'] = contentType
    const allParams = Object.assign(
      {},
      this._defaultConfig.defaultParams,
      params
    )

    const requestConfig: HttpClientConfig = {
      url: `${baseURL}/${path}`,
      method,
      headers
    }

    if (Method.GET === method) {
      requestConfig.params = allParams
    } else {
      requestConfig.data = allParams
    }

    if (
      DuplicateRequest.hashUrlAndParams(
        requestConfig.url ?? '',
        method,
        allParams
      )
    ) {
      console.log('click quick')
      return null
    }

    // 请求拦截
    this._httpClient.interceptors.request.use((config) => {
      return config
      // const nowTime = Date.now()
      // const oldTime = parseInt(getTime() as string)
      // const seconds = (nowTime - oldTime) / 1000
      // 每次请求接口进行判断，每半小时刷新一次token
      // token过期后，再次请求刷新token
      // if (
      //   (seconds > 10 && !config.url?.includes('auth/login')) ||
      //   this._countRequest
      // ) {
      //   setTime(nowTime.toString())
      //   const data = {
      //     username: '',
      //     password: '',
      //     refreshToken: getRefreshToken() || ''
      //   }
      //   return new Promise((resolve, reject) => {
      //     getRefresh(data)
      //       .then((res: null | RefreshModel) => {
      //         if (res?.token) {
      //           // 新token用于接口请求
      //           setToken(res.token)
      //           // refresh_token用于刷新token
      //           setRefreshToken(res.refreshToken)
      //           useStore().commit(UserMutationTypes.SET_TOKEN, res.token)
      //           useStore().commit(
      //             UserMutationTypes.SET_REFRESH_TOKEN,
      //             res.refreshToken
      //           )
      //           config.headers['X-App-Token'] = res.token
      //         }
      //         resolve(config)
      //       })
      //       .catch((err: RootObject<string>) => {
      //         reject(err)
      //       })
      //   })
      // } else {
      //   return config
      // }
    })

    // 响应拦截
    this._httpClient.interceptors.response.use(
      (response) => {
        const data = response.data
        if (response.status === 200) {
          // 有code返回reject
          if (data.code !== 0) {
            // token过期后，将会再次请求刷新token
            if (data.code === 10002 || data.code === 10004) {
              ++this._countRequest
              if (this._countRequest === 1) {
                this._httpClient.request(response.config)
              } else {
                useStore().dispatch(UserActionTypes.ACTION_LOGIN_OUT, undefined)
                router.push('/login').catch((err) => {
                  console.warn(err)
                })
                this._countRequest = 0
              }
            }
            return Promise.reject(data)
          } else {
            return data as T
          }
        }
        ElMessage.error(data.message)
        return response.data
      },
      (error) => {
        ElMessage.error(error.message)
        return Promise.reject(error)
      }
    )

    return (await this._httpClient.request(requestConfig)) as T
  }
}
