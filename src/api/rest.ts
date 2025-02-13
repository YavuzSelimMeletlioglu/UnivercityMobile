import axios, { AxiosError, AxiosInstance, RawAxiosRequestHeaders } from "axios";

export class APIRequest {
    protected baseUrl = "http://localhost:3000/"
    private static instance: APIRequest | null = null;

    constructor() {

    }

    static INSTANCE() {
        if (!this.instance) {
            this.instance = new APIRequest()
        }
        return this.instance;
    }

    axiosInstance(headers: RawAxiosRequestHeaders = {}): AxiosInstance {
        const defaultHeaders: RawAxiosRequestHeaders = {
            'Content-Type': 'application/json',
            //Authorization: this.SECRET ? `Bearer ${this.SECRET}` : "",
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };

        return axios.create({
            baseURL: this.baseUrl,
            timeout: 10000,
            headers: mergedHeaders,
        });
    }

    async get<T = any, D = any>(
        url: string,
        params?: D,
        headers: RawAxiosRequestHeaders = {},
    ): Promise<T | undefined> {
        try {
            const axiosInstance = this.axiosInstance(headers);
            const response = await axiosInstance.get<T>(url, { params });
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            this.alertError(err);
        }
    }

    async post<T = any>(url: string, params: any, headers: RawAxiosRequestHeaders = {}): Promise<T | undefined> {
        try {
            const axiosInstance = this.axiosInstance(headers);
            const response = await axiosInstance.post<T>(url, params);
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            this.alertError(err);
        }
    }

    alertError = (err: AxiosError) => {
        if (err.response) {
            if (err.response.status === 429) {
                alert("Çok fazla istek attınız. 2 dakika bekleyiniz.")
            } else if (err.response.status === 422) {
                alert("Kullanıcı bilgilerini kontrol ediniz.")
            } else if (err.response.status === 500) {
                alert("Sunucuda bir hata var. Yetkili kişiyle irtibata geçiniz.")
            } else if (err.response.status !== 401) {
                alert(err.message)
            }
        }
    }
}