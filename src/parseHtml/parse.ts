import fs from 'fs';
import readline from 'readline';
import shell from 'shelljs';
import awk from '../../node_modules/awk/index';
import intercept from 'intercept-stdout';
import { AxiosResponse } from 'axios';

export class ParseHtml {
    intermediate: string
    finalState: string 
    constructor() {
        this.intermediate = '';
        this.finalState = '';
    }

    async parseHtml(config: &any,resp: AxiosResponse): Promise<string[]> {
        this.intermediate = ''
        if(!fs.existsSync('./temp')) {
            shell.mkdir('./temp')
        }
        let awkScript = fs.readFileSync(config.Dict.awkScript)
        shell.ShellString(resp.data).to(config.Dict.tmpHtml)
        let tmpdata = fs.readFileSync(config.Dict.tmpHtml)
        let unhook_intercept = intercept((txt) => {
            this.intermediate += txt;
        });
        let awkResp = awk(awkScript, tmpdata)
        this.intermediate += awkResp.stdout
        // console.log("%O",awkResp);
        unhook_intercept();
        let dictTmp = shell.ShellString(this.intermediate).sed(/<[^>]*>/g,'').sed(/&nbsp;/g, '').sed(/&rarr;/g,'').sed(/^\s*/g,'').grep('-v',/^$/)
        dictTmp.to(config.Dict.DictTmp)
        let resArr = await this.handleparse(config.Dict.DictTmp)
        return resArr
    }

    async handleparse(filePath: string): Promise<string[]> {
        return new Promise(function (resolve, reject){
            let resArray: string[] = []
            let is_head = true
            let num_reg = /[0-9]+\./
            let exp_reg = /例：/
            let [ head, body ] = ['','']
            let [ ln_item, ln_eg ] = [ 0, 0 ]
            let fRStream = fs.createReadStream(filePath)
            let fReadLine = readline.createInterface({
                input: fRStream
            })
            
            fReadLine.on('line', (line) => {
                ln_item ++, ln_eg ++;
                if(num_reg.test(line)) {
                    is_head = false
                    ln_item = 0
                }
                if(exp_reg.test(line)) {
                    ln_eg = 0
                }
                if(is_head) {
                    head = head + ' ' + line
                } else {
                    if (ln_item == 0) {
                        line = '\x1b[32;1m\n\n' + line + '\x1b[0m'
                    } else if(ln_item == 1) {
                        line = '\x1b[32;1m[' + line + ']'+ '\x1b[0m'
                    } else if(ln_item == 2) {
                        line = '\x1b[1m' + line + '\x1b[0m'
                    } else if(ln_eg == 0) {
                        line = '\x1b[32;1m\n   ' + line + '\x1b[0m'
                    } else if(ln_eg == 1) {
                        line = '\x1b[33m' + line + '\x1b[0m'
                    } else if(ln_eg == 2) {
                        line = "\x1b[33m" + line + '\x1b[0m'
                    }
                    body = body + ' ' + line
                }
            })
            fReadLine.on('close',function (){
                resArray.push(head, body)
                resolve(resArray)
            })
        })
    }
}
