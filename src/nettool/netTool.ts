import log4js from 'log4js';
import { AxiosStatic, AxiosResponse } from 'axios';

export class SendHttp {

    constructor(public axios: AxiosStatic,public logger: &log4js.Logger) {
        
    }

    async get(url: string, param: string):Promise<AxiosResponse> {
        return this.axios.get(url + '?' + param)
    }

    async post(url: string, param: string):Promise<AxiosResponse> {
            let paramJson = JSON.stringify(param);
            return  this.axios.post(url, paramJson)
    }
}