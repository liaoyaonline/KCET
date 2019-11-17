"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
class Dict {
    constructor(config, logger, parseUtil, axios) {
        this.config = config;
        this.logger = logger;
        this.parseUtil = parseUtil;
        this.axios = axios;
        this.wordBatch = new Map();
    }
    async transferOne(param) {
        try {
            let resp = await this.axios.get(this.config.Dict.DictUrlList[0], param);
            let result = await this.parseUtil.parseHtml(this.config, resp);
            return result;
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
    // TODO: can update for pointed Dir of word file
    async transferBatch(filePath) {
        return new Promise((resolve, reject) => {
            try {
                let fReadStream = fs_1.default.createReadStream(filePath);
                let fileReadLine = readline_1.default.createInterface({
                    input: fReadStream
                });
                fileReadLine.on('line', async (line) => {
                    this.logger.info(line);
                    let value = [];
                    this.wordBatch.set(line, value);
                });
                fileReadLine.on('close', async () => {
                    for (let key of this.wordBatch.keys()) {
                        let resp = await this.transferOne('q=' + key);
                        // this.logger.info("YouDaoResp: " + resp + '\n\n')
                        this.wordBatch.set(key, resp);
                    }
                    resolve(this.wordBatch);
                });
            }
            catch (error) {
                this.logger.error(error);
                reject(error);
            }
        });
    }
}
exports.Dict = Dict;
