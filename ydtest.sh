#!/bin/bash
while read line
do
    var=$(yd $line)
    echo "$var" >> chinese.txt
done < english.txt
