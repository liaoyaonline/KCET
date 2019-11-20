#!/bin/bash
option=$1
target=$2
kcete(){
    tmp="$(yd $option $target)"
    echo $tmp
}
kcete
