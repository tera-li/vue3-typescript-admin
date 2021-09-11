import { getToken, getRefreshToken } from '@/utils/cookies'

export interface UserState {
  token: string
  refreshToken: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}

export const state: UserState = {
  token: getToken() || '',
  refreshToken: getRefreshToken() || '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: ''
}
