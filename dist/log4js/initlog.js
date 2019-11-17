"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
class LogPrint {
    constructor(logTitle) {
        log4js_1.default.configure({
            appenders: {
                out: {
                    type: "console"
                },
                default: {
                    type: 'dateFile',
                    //文件名为= filename + pattern, 设置为alwaysIncludePattern：true
                    filename: 'logs/Dict',
                    pattern: '-yyyy-MM-dd.log',
                    //包含模型
                    alwaysIncludePattern: true,
                }
            },
            categories: {
                default: { appenders: ['out', 'default'], level: 'info' },
            }
        });
        this.logger = log4js_1.default.getLogger(logTitle);
    }
    static getInstance() {
        return this._instance;
    }
    getLogger() {
        return this.logger;
    }
}
exports.LogPrint = LogPrint;
LogPrint.titleName = 'Dict';
LogPrint._instance = new LogPrint(LogPrint.titleName);
