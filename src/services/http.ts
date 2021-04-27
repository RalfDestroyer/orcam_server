import axios, { AxiosInstance } from 'axios';


export class Http {
    private instance: AxiosInstance
    constructor(baseUrl: string, authKey: string) {
        this.instance = axios.create({
            baseURL: baseUrl,
            headers: { 'Authorization': authKey }
        });
    }

    get = (url: string, params?: any): Promise<any> => {
        return this.respHandler(this.instance.get(url, { params: params}))
    }

    post = (url: string, payload: any): Promise<any> => {
        return this.respHandler(this.instance.post(url, payload))
    }

    respHandler = async (request: Promise<any>): Promise<any> => {
        try {
            const resp = await request
            return resp.data
        } catch (error) {
            console.error(`ERROR MESSAGE: ${error.message}`);
            return null
        }
    }
}