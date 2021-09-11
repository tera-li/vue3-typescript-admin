export interface UserInfoModel {
  id: number
  username: string
  password: string
  name: string
  avatar: string
  introduction: string
  email: string
  phone: string
  roles: string[]
}

export interface Users {
  items: any
}

export interface RefreshModel {
  token: string
  refreshToken: string
}
