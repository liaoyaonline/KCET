import { LogPrint } from './log4js/initlog';
import * as utils from './utils/utils';
import { Dict } from './Dict/Dict';
import { configStr, awkScript } from './Dict/define';
import axios from 'axios';
import { SendHttp } from './nettool/netTool';
import { ParseHtml } from './parseHtml/parse';
import commander from 'commander';
import shell from 'shelljs';
import fs from 'fs';

const version = '1.0.0'
const logger = LogPrint.getInstance().getLogger()
const config = utils.GetJSONStr(utils.ConfigPath)
console.log('\x1b[35mWelcome to the Dict. you can type the "-h" or "--help" to lookup the help message.\x1b[0m\n');


commander.usage("\x1b[32mThis is a tool of translating Cmd software.Using after pleasing install in '-i' or '--install' option.\x1b[0m")
            .version(version)
                .option('-i, --install', 'use after pleasing install the Application')
                .option('-s, --sigle <type>', 'translate sigle word.')
                .option('-b, --batch', 'translate batch words by the wordfile of the word dir')
                .option('-e, --example', 'whether show the example of pointed word')
                .option('-r, --review', 'using to review and learn word again.')
                .parse(process.argv);

function handleBashCmd (DictDemo: Dict){
    try {
        if(commander.install){
            shell.ShellString(JSON.stringify(configStr)).to(utils.ConfigPath)
            shell.mkdir(utils.scriptDir)
            shell.ShellString(awkScript).to(utils.scriptDir + utils.scriptFile)
            process.exit(0)
        }

        if(commander.sigle){
            DictDemo.transferOne('q=' + `${commander.sigle}`).then(function (resp){
                if(!commander.example) {
                    console.log(resp[0])
                } else {
                    console.log(resp[0] + '\n' + resp[1])
                }
            })
        }
        if(commander.batch){
            let fileName = config.Dict.DefaultFile
            shell.ShellString('').to(config.Dict.WordDir + "/chinese." + fileName)
            if(!fs.existsSync(config.Dict.WordDir + "/" + fileName)){
                logger.error("Before please make sure the word.txt file that is address of query word in the word dir.")
                return
            }

            DictDemo.transferBatch(config.Dict.WordDir + "/" + fileName).then(function (resp){
                if(!commander.example) {
                    for (const value of resp.values()) {
                        shell.ShellString(value[0] + '\n').toEnd(config.Dict.WordDir + "/chinese." + fileName)
                        console.log(value[0])
                    }
                } else {
                    for (const value of resp.values()) {
                        shell.ShellString(value[0] + '\n' + value[1]+ '\n').toEnd(config.Dict.WordDir + "/chinese." + fileName)
                        console.log(value[0] + '\n' + value[1])
                    }
                }
            })
        }
    } catch (error) {
        logger.error("Dict some error happened: " + error.message)
    }
}

async function main (){
    // Define init class
    let parseutil = new ParseHtml()
    let DictDemo = new Dict(config, logger, parseutil,new SendHttp(axios, logger))

    handleBashCmd(DictDemo)

    if(process.argv.length <= 3 && process.argv[2][0] !== '-') {   // default mode is sigle and no example
        DictDemo.transferOne('q=' + process.argv[2]).then(function (resp){
            if(!commander.example) {
                console.log(resp[0])
            } else {
                console.log(resp[0] + '\n' + resp[1])
            }
        })
    }        
}

main();
