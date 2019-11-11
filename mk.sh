#!/bin/bash
a=$1;
mkdir $a
cp english*.txt $a
cp chinese*.txt $a
rm english*.txt
rm chinese*.txt
