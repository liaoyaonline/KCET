#!/bin/bash
a=$1;
b="english"$1".txt"
c="chinese"$1".txt"
cp english.txt $b
cp chinese.txt $c
rm english.txt chinese.txt
