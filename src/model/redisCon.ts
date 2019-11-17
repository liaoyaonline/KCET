import * as redis from 'redis'
import  log4js from 'log4js';
import { promisify } from 'util';       // use native promise
// import bluebird from 'bluebird';
// bluebird.promisifyAll(redis.RedisClient.prototype); // ???

// import * as utils from '../utils/utils';
// import { LogPrint } from '../log4js/initlog';
// let logType = typeof LogPrint.getInstance().getLogger()
// const config = utils.GetJSONStr(utils.ConfigPath)

export class RedisDB {
    client : redis.RedisClient;
    constructor(public config: any, public logger: log4js.Logger) {
        console.log('constructor RedisDB function');
        // ToDo: try...catch
        this.client = redis.createClient(config.CCConfig.RedisAddr.split(':',2)[1], config.CCConfig.RedisAddr.split(':',2)[0],{auth_pass: config.CCConfig.Password})
    }

    getLogger() : log4js.Logger {
        return this.logger;
    }

    redisOn() {
        this.client.on("error", (this.logger,function  (err){        
            console.log("Error: " + err)                            // ??? logger.error()
            throw new Error("Dict: can't connect to the redis.")
        }))
    }

    getAsync() {
        return promisify(this.client.get).bind(this.client);
    }

    async get(key: string) {
        let resp = await this.getAsync()(key)
        this.logger.info('AfterGet: ' + resp)
        return resp
    }
    
    setAsync() {
        return promisify(this.client.set).bind(this.client);
    }

    async set(key: string, value: string) {
        try {
            await this.setAsync()(key, value)
        } catch (error) {
            this.logger.error(error)
        }
    }

    delAsync() {
        return promisify(this.client.del).bind(this.client);
    }

    async del(key: string) {
         try {
            await this.delAsync()()
        } catch (error) {
            this.logger.error(error)
        }
    }

    hGetAllAsync() {
        return promisify(this.client.hgetall).bind(this.client);
    }

    async hGetAll(key: string) {
         try {
            await this.hGetAllAsync()(key)
        } catch (error) {
            this.logger.error(error)
        }
    }
    
    hMSetAsync() {
        return promisify(this.client.hmset).bind(this.client);
    }

    async hMSet(item: string, key: string, value: string) {
         try {
            await this.hMSetAsync()([item, key, value])
        } catch (error) {
            this.logger.error(error)
        }
    }
    
    hDelAsync() {
        return promisify(this.client.hdel).bind(this.client);
    }

    async hDel(item: string, key: string) {
        try {
            await this.hDelAsync()()
        } catch (error) {
            this.logger.error(error)
        }
    }
}
