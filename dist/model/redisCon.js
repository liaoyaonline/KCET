"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis = __importStar(require("redis"));
const util_1 = require("util"); // use native promise
// import bluebird from 'bluebird';
// bluebird.promisifyAll(redis.RedisClient.prototype); // ???
// import * as utils from '../utils/utils';
// import { LogPrint } from '../log4js/initlog';
// let logType = typeof LogPrint.getInstance().getLogger()
// const config = utils.GetJSONStr(utils.ConfigPath)
class RedisDB {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        console.log('constructor RedisDB function');
        // ToDo: try...catch
        this.client = redis.createClient(config.CCConfig.RedisAddr.split(':', 2)[1], config.CCConfig.RedisAddr.split(':', 2)[0], { auth_pass: config.CCConfig.Password });
    }
    getLogger() {
        return this.logger;
    }
    redisOn() {
        this.client.on("error", (this.logger, function (err) {
            console.log("Error: " + err); // ??? logger.error()
            throw new Error("Dict: can't connect to the redis.");
        }));
    }
    getAsync() {
        return util_1.promisify(this.client.get).bind(this.client);
    }
    async get(key) {
        let resp = await this.getAsync()(key);
        this.logger.info('AfterGet: ' + resp);
        return resp;
    }
    setAsync() {
        return util_1.promisify(this.client.set).bind(this.client);
    }
    async set(key, value) {
        try {
            await this.setAsync()(key, value);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    delAsync() {
        return util_1.promisify(this.client.del).bind(this.client);
    }
    async del(key) {
        try {
            await this.delAsync()();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    hGetAllAsync() {
        return util_1.promisify(this.client.hgetall).bind(this.client);
    }
    async hGetAll(key) {
        try {
            await this.hGetAllAsync()(key);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    hMSetAsync() {
        return util_1.promisify(this.client.hmset).bind(this.client);
    }
    async hMSet(item, key, value) {
        try {
            await this.hMSetAsync()([item, key, value]);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    hDelAsync() {
        return util_1.promisify(this.client.hdel).bind(this.client);
    }
    async hDel(item, key) {
        try {
            await this.hDelAsync()();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
}
exports.RedisDB = RedisDB;
