export let configStr = {
    "Dict": {
        "DictUrlList": [
            "http://dict.youdao.com/search"
        ],
        "awkScript": "./scripts/handleParse.awk",
        "tmpHtml":  "./temp/tmpHtml.txt",
        "AwkTmp":   "./temp/awk.tmp",
        "DictTmp":  "./temp/Dict.tmp",
        "WordDir":  "./word",
        "DefaultFile": "word.txt"
    },
    "CCConfig": {
        "RedisAddr": "42.159.157.100:20337",
        "Password": "123456"
    }
}

export let awkScript = "BEGIN{j=0;i=0;} {if(/phrsListTab/){i++;} if(i==1){print $0; if(/<\\/ul>/){i=0;}} if(/collinsToggle/){ j++;} if(j==1) {print $0; if(/<\\/ul>/){j=0;}}}"
