import config from "@/config";
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    CancelTokenStatic,
    CancelTokenSource,
} from "axios";
interface HttpRequest {
    baseURL: string;
    timeout: number;
}
interface ResponseCustom<T> {
    err?: number;
    data: T;
    msg?: string;
}
interface CustomConfig extends AxiosRequestConfig {
    headers?: any;
}

const cancelRequest: CancelTokenSource[] = [];
class HttpRequest {
    constructor() {
        this.baseURL = config.baseURL; //默认地址
        this.timeout = 6000; // 3s后请求超时
    }
    private setInterceptors(instance: AxiosInstance) {
        //创建单独的拦截器
        instance.interceptors.request.use(
            (config: AxiosRequestConfig): AxiosRequestConfig => {
                // 一般增加一些token属性等  jwt
                config.headers.authorization = "token";
                return config;
            }
        );
        instance.interceptors.response.use(
            (res: AxiosResponse) => {
                if (res.status === 200) {
                    // 服务返回的结果都会放到data中
                    if (res.data.err === 0) {
                        return Promise.resolve(res.data); //成功状态
                    } else {
                        return Promise.reject(res.data.msg);
                    }
                } else {
                    return Promise.reject(res.data.data);
                    //后端实现的话,如果失败了会在返回的结果中增加一个data字段 失败的原因
                }
            },
            (err: AxiosError) => {
                // 单独处理其他的状态码异常
                if (axios.isCancel(err)) {
                    console.log("Request canceled", err);
                } else {
                    switch (err.response?.status) {
                        case 401:
                            console.log(err);
                            break;
                        default:
                            break;
                    }
                }
                return Promise.reject(err);
            }
        );
    }
    private mergeOptions(options: CustomConfig) {
        return { baseURL: this.baseURL, timeout: this.timeout, ...options };
    }
    private request<R>(options: CustomConfig): Promise<ResponseCustom<R>> {
        const instance: AxiosInstance = axios.create(); // 创建axios实例
        this.setInterceptors(instance); //创建单独的拦截器
        const opts = this.mergeOptions(options); //合并选项
        const cancelToken: CancelTokenStatic = axios.CancelToken; //使用 cancel token 取消请求
        const source: CancelTokenSource = cancelToken.source();
        cancelRequest.push(source);
        return instance.request<R>({ ...opts, cancelToken: source.token }); //单独拦截器的配置项
    }
    public get<R>(
        url: string,
        config: CustomConfig = {}
    ): Promise<ResponseCustom<R>> {
        //get请求 以字符串的形式传入 路径参数  ?a=1
        return this.request<R>({
            method: "GET",
            url,
            ...config, // 参数可以直接展开
        });
    }
    public post<R>(url: string, data?: any): Promise<ResponseCustom<R>> {
        //post请求 数据在请求体中 {}
        return this.request({
            method: "POST",
            url,
            data: data, // post要求必须传入data属性
        });
    }
}

export const cancelRequestHandle = () => {
    cancelRequest.forEach((item) => item.cancel());
    cancelRequest.length = 0;
};
export default new HttpRequest();
