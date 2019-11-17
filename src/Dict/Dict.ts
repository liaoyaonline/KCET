import log4js from 'log4js';
import { RedisDB } from '../model/redisCon';
import { SendHttp } from '../nettool/netTool';
import fs from 'fs';
import readline from 'readline';
import { ParseHtml } from '../parseHtml/parse';

export class Dict {
    wordBatch: Map<string,string[]>
    constructor(public config: any,public logger: &log4js.Logger,public parseUtil: ParseHtml,public axios: SendHttp) {
        this.wordBatch = new Map()
    }

    async transferOne(param: string):Promise<string[]>{
        try {
            let resp = await this.axios.get(this.config.Dict.DictUrlList[0],param)
            let result = await this.parseUtil.parseHtml(this.config, resp)
            return result
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }
    
    // TODO: can update for pointed Dir of word file
    async transferBatch(filePath: string):Promise<Map<string,string[]>>{
        return new Promise((resolve, reject) => {
            try {
                let fReadStream = fs.createReadStream(filePath)
                let fileReadLine = readline.createInterface({
                    input: fReadStream
                })
    
                fileReadLine.on('line', async (line) => {
                    this.logger.info(line)
                    let value: string[] = []
                    this.wordBatch.set(line, value)
                })
                
                fileReadLine.on('close',async() => {
                    for (let key of this.wordBatch.keys()) {
                        let resp = await this.transferOne('q=' + key)
                        // this.logger.info("YouDaoResp: " + resp + '\n\n')
                        this.wordBatch.set(key, resp)
                    }
                    resolve(this.wordBatch)
                })
            } catch (error) {
                this.logger.error(error)
                reject(error)
            }
        })
    }
}
