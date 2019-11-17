"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initlog_1 = require("./log4js/initlog");
const utils = __importStar(require("./utils/utils"));
const Dict_1 = require("./Dict/Dict");
const define_1 = require("./Dict/define");
const axios_1 = __importDefault(require("axios"));
const netTool_1 = require("./nettool/netTool");
const parse_1 = require("./parseHtml/parse");
const commander_1 = __importDefault(require("commander"));
const shelljs_1 = __importDefault(require("shelljs"));
const fs_1 = __importDefault(require("fs"));
const version = '1.0.0';
const logger = initlog_1.LogPrint.getInstance().getLogger();
const config = utils.GetJSONStr(utils.ConfigPath);
console.log('\x1b[35mWelcome to the Dict. you can type the "-h" or "--help" to lookup the help message.\x1b[0m\n');
commander_1.default.usage("\x1b[32mThis is a tool of translating Cmd software.Using after pleasing install in '-i' or '--install' option.\x1b[0m")
    .version(version)
    .option('-i, --install', 'use after pleasing install the Application')
    .option('-s, --sigle <type>', 'translate sigle word.')
    .option('-b, --batch', 'translate batch words by the wordfile of the word dir')
    .option('-e, --example', 'whether show the example of pointed word')
    .option('-r, --review', 'using to review and learn word again.')
    .parse(process.argv);
function handleBashCmd(DictDemo) {
    try {
        if (commander_1.default.install) {
            shelljs_1.default.ShellString(JSON.stringify(define_1.configStr)).to(utils.ConfigPath);
            shelljs_1.default.mkdir(utils.scriptDir);
            shelljs_1.default.ShellString(define_1.awkScript).to(utils.scriptDir + utils.scriptFile);
            process.exit(0);
        }
        if (commander_1.default.sigle) {
            DictDemo.transferOne('q=' + `${commander_1.default.sigle}`).then(function (resp) {
                if (!commander_1.default.example) {
                    console.log(resp[0]);
                }
                else {
                    console.log(resp[0] + '\n' + resp[1]);
                }
            });
        }
        if (commander_1.default.batch) {
            let fileName = config.Dict.DefaultFile;
            shelljs_1.default.ShellString('').to(config.Dict.WordDir + "/chinese." + fileName);
            if (!fs_1.default.existsSync(config.Dict.WordDir + "/" + fileName)) {
                logger.error("Before please make sure the word.txt file that is address of query word in the word dir.");
                return;
            }
            DictDemo.transferBatch(config.Dict.WordDir + "/" + fileName).then(function (resp) {
                if (!commander_1.default.example) {
                    for (const value of resp.values()) {
                        shelljs_1.default.ShellString(value[0] + '\n').toEnd(config.Dict.WordDir + "/chinese." + fileName);
                        console.log(value[0]);
                    }
                }
                else {
                    for (const value of resp.values()) {
                        shelljs_1.default.ShellString(value[0] + '\n' + value[1] + '\n').toEnd(config.Dict.WordDir + "/chinese." + fileName);
                        console.log(value[0] + '\n' + value[1]);
                    }
                }
            });
        }
    }
    catch (error) {
        logger.error("Dict some error happened: " + error.message);
    }
}
async function main() {
    // Define init class
    let parseutil = new parse_1.ParseHtml();
    let DictDemo = new Dict_1.Dict(config, logger, parseutil, new netTool_1.SendHttp(axios_1.default, logger));
    handleBashCmd(DictDemo);
    if (process.argv.length <= 3 && process.argv[2][0] !== '-') { // default mode is sigle and no example
        DictDemo.transferOne('q=' + process.argv[2]).then(function (resp) {
            if (!commander_1.default.example) {
                console.log(resp[0]);
            }
            else {
                console.log(resp[0] + '\n' + resp[1]);
            }
        });
    }
}
main();
