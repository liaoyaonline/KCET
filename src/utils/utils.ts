import { LogPrint } from '../log4js/initlog';
import * as fs from "fs"

const logger = LogPrint.getInstance().getLogger()

export const ConfigPath = './config.json'
export const scriptDir = './scripts'
export const scriptFile = '/handleParse.awk'


export function GetJSONStr(fileName:string) {
    try {
        let contents = fs.readFileSync(fileName, 'utf8')
        return JSON.parse(contents)
    }
    catch(error) {
        logger.log(fileName+',The file has a format problem or special characters')
        logger.log(error)
    }
}