"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const shelljs_1 = __importDefault(require("shelljs"));
const index_1 = __importDefault(require("../../node_modules/awk/index"));
const intercept_stdout_1 = __importDefault(require("intercept-stdout"));
class ParseHtml {
    constructor() {
        this.intermediate = '';
        this.finalState = '';
    }
    async parseHtml(config, resp) {
        this.intermediate = '';
        if (!fs_1.default.existsSync('./temp')) {
            shelljs_1.default.mkdir('./temp');
        }
        let awkScript = fs_1.default.readFileSync(config.Dict.awkScript);
        shelljs_1.default.ShellString(resp.data).to(config.Dict.tmpHtml);
        let tmpdata = fs_1.default.readFileSync(config.Dict.tmpHtml);
        let unhook_intercept = intercept_stdout_1.default((txt) => {
            this.intermediate += txt;
        });
        let awkResp = index_1.default(awkScript, tmpdata);
        this.intermediate += awkResp.stdout;
        // console.log("%O",awkResp);
        unhook_intercept();
        let dictTmp = shelljs_1.default.ShellString(this.intermediate).sed(/<[^>]*>/g, '').sed(/&nbsp;/g, '').sed(/&rarr;/g, '').sed(/^\s*/g, '').grep('-v', /^$/);
        dictTmp.to(config.Dict.DictTmp);
        let resArr = await this.handleparse(config.Dict.DictTmp);
        return resArr;
    }
    async handleparse(filePath) {
        return new Promise(function (resolve, reject) {
            let resArray = [];
            let is_head = true;
            let num_reg = /[0-9]+\./;
            let exp_reg = /例：/;
            let [head, body] = ['', ''];
            let [ln_item, ln_eg] = [0, 0];
            let fRStream = fs_1.default.createReadStream(filePath);
            let fReadLine = readline_1.default.createInterface({
                input: fRStream
            });
            fReadLine.on('line', (line) => {
                ln_item++, ln_eg++;
                if (num_reg.test(line)) {
                    is_head = false;
                    ln_item = 0;
                }
                if (exp_reg.test(line)) {
                    ln_eg = 0;
                }
                if (is_head) {
                    head = head + ' ' + line;
                }
                else {
                    if (ln_item == 0) {
                        line = '\x1b[32;1m\n\n' + line + '\x1b[0m';
                    }
                    else if (ln_item == 1) {
                        line = '\x1b[32;1m[' + line + ']' + '\x1b[0m';
                    }
                    else if (ln_item == 2) {
                        line = '\x1b[1m' + line + '\x1b[0m';
                    }
                    else if (ln_eg == 0) {
                        line = '\x1b[32;1m\n   ' + line + '\x1b[0m';
                    }
                    else if (ln_eg == 1) {
                        line = '\x1b[33m' + line + '\x1b[0m';
                    }
                    else if (ln_eg == 2) {
                        line = "\x1b[33m" + line + '\x1b[0m';
                    }
                    body = body + ' ' + line;
                }
            });
            fReadLine.on('close', function () {
                resArray.push(head, body);
                resolve(resArray);
            });
        });
    }
}
exports.ParseHtml = ParseHtml;
