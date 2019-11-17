import  log4js  from 'log4js';

export class LogPrint {
    private static titleName = 'Dict';
    private static _instance:LogPrint = new LogPrint(LogPrint.titleName);
    private logger:log4js.Logger;
    private constructor(logTitle: string) {
        log4js.configure({
            appenders:{
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
                default: { appenders: ['out','default'], level: 'info' },
            }
        })
        this.logger = log4js.getLogger(logTitle)
    }  

    public static getInstance():LogPrint {
        return this._instance
    }

    public getLogger():log4js.Logger {
        return this.logger
    }
}