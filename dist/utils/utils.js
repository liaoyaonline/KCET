"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const initlog_1 = require("../log4js/initlog");
const fs = __importStar(require("fs"));
const logger = initlog_1.LogPrint.getInstance().getLogger();
exports.ConfigPath = './config.json';
exports.scriptDir = './scripts';
exports.scriptFile = '/handleParse.awk';
function GetJSONStr(fileName) {
    try {
        let contents = fs.readFileSync(fileName, 'utf8');
        return JSON.parse(contents);
    }
    catch (error) {
        logger.log(fileName + ',The file has a format problem or special characters');
        logger.log(error);
    }
}
exports.GetJSONStr = GetJSONStr;
