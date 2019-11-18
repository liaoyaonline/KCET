#!/bin/bash
option=$1
filename=$2
vesion='1.0.0'
kcetv(){
    echo $vesion
}
kceth(){
    echo "Usage: kcet [OPTIONS] [SOURCE]"
    echo " "
    echo "Information options:"
    echo "    -V  -version"
    echo "        Print version and exit."
    echo "    -H  -help"
    echo "        Print help message and exit."
    echo "    -C  -copy"
    echo "        Back up files that have already been prepared"
    echo "    -M  -Mkdir"
    echo "        Back up the file and save it to a new folder"
    echo "    -B  -batch"
    echo "        translate batch words by the wordfile of the word dir."
}
kcetc(){
    a=$2;
    b="english"$filename".txt"
    c="chinese"$filename".txt"
    cp english.txt $b
    cp chinese.txt $c
}
kcetm(){
    a=$filename;
    mkdir $a
    cp english*.txt $a
    cp chinese*.txt $a
    rm english*.txt
    rm chinese*.txt
}
kcet(){
    var=$(yd $option)
    echo "$var"
}
kcetb(){
    while read line
    do
        var=$(yd $line)
        echo "$var" >> chinese.txt
    done < english.txt
}
case ${option} in
    -v)
        kcetv
        ;;
    -h)
        kceth
        ;;
    -c)
        kcetc
        ;;
    -m)
        kcetm
        ;;
    -b)
        kcetb
        ;;
    *)
        kcet
        exit 1
        ;;
esac
