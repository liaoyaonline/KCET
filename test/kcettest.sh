#!/bin/bash
kcetv(){
    tmp="kcet -v"
    echo "testcase:kcet -v "
    kcet -v
    echo "kcet -v pass"
}
kceth(){
    echo "testcase:kcet -h "
    kcet -h
    echo "kcet -h pass"
}
kceta(){
    echo "testcase:kcet -a hello "
    kcet -a hello
    echo "kcet -a  pass"
}
kcetb(){
    echo "testcase:kcet -b "
    kcet -b
    echo "open output chinese.txt"
    cat chinese.txt
    echo "kcet -b pass"
}
kcetc(){
    echo "testcase:kcet -c ONEQ "
    kcet -c ONEQ
    echo "kcet -c pass"
}
kcetm(){
    echo "testcase:kcet -m 20170901 "
    kcet -m 20170901
    echo "kcet -m pass"
}
main(){
    kcetv
    kceth
    kceta
    kcetb
    kcetc
    kcetm
    echo "test successful,you can input kcet -h get help"
}
main
