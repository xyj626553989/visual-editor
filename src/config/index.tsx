export interface BaseURL {
  baseURL: string
}

const baseURL: BaseURL = {
  // 开发打包是默认的两个环境
  baseURL: process.env.NODE_ENV === 'development' ? '/' : '/',
}
export default baseURL
