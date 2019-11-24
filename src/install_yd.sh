#!/bin/bash
CMD=/usr/bin/yd

cat > ${CMD} <<EOF
#!/bin/bash
TMP_FILE="/tmp/tmp.tmp"
word=\$2
option=\$1
get(){
    keyword=\$1
    curl -s 'http://dict.youdao.com/search?q='\$keyword'' | awk 'BEGIN{j=0;i=0;} {if(/phrsListTab/){i++;} if(i==1){print \$0; if(/<\/ul>/){i=0;}} if(/collinsToggle/){ j++;} if(j==1) {print \$0; if(/<\/ul>/){j=0;}}}' | sed 's/<[^>]*>//g' | sed 's/&nbsp;//g'| sed 's/&rarr;//g' | sed 's/^\s*//g' | sed '/^$/d'> \$TMP_FILE
    # 处理输出
    is_head=true # 当前行是否属于“头部”
    head="" # 头部内容
    body="" # 主体内容
    ln_item=0 # 每一条解释的行号
    ln_eg=0 # 例句行号

    while read line
    do
        let ln_item++
        let ln_eg++
        num_flag=\$(echo "\$line" | awk '/[0-9]+\.\$/')
        if [ "\$num_flag" != "" ]; then ## 遇见'数字+点'开头的行
            is_head=false # 第一次遇见数字行  将头部标示设置为false
            ln_item=0
        fi

        eg_flag=\$(echo "\$line" | awk '/例：$/') # 遇见'例：'开头的行
        if [ "\$eg_flag" != "" ]; then
            ln_eg=0
        fi

        if \$is_head ; then
            head="\$head \$line"
        else
            if [ \$ln_item == 0 ] ; then
                line="\033[32;1m\n\n\$line\033[0m" # 释义编号
            elif [ \$ln_item == 1 ] ; then
                line="\033[32;1m[\$line]\033[0m" # 词性
            elif [ \$ln_item == 2 ] ; then
                line="\033[1m\$line\033[0m" # 释义
            elif [ \$ln_eg == 0 ] ; then
                line="\033[32;1m\n   \$line\033[0m" # 例：
            elif [ \$ln_eg == 1 ]; then
                line="\033[33m\$line\033[0m" # 例句
            elif [ \$ln_eg == 2 ]; then
                line="\033[33m\$line\033[0m" # 例句释义
            fi
            body="\$body \$line"
        fi
    done < \$TMP_FILE
}
output()
{
    echo -e "\$head"
}
outputa()
{
    echo -e "\$head \$body"
}
main(){
    while getopts "a" opt
    do
        case \$opt in
            a)
                get \$2
                outputa
                exit 1;
                ;;
            ?)
                echo "没有参数类型:\$1"
                ;;
        esac
    done
    get \$1
    output
}
main \$option \$word
EOF

chmod +x ${CMD}
