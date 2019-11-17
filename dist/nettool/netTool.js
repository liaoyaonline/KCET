"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SendHttp {
    constructor(axios, logger) {
        this.axios = axios;
        this.logger = logger;
    }
    async get(url, param) {
        return this.axios.get(url + '?' + param);
    }
    async post(url, param) {
        let paramJson = JSON.stringify(param);
        return this.axios.post(url, paramJson);
    }
}
exports.SendHttp = SendHttp;
