#!/usr/bin/env python
# coding=utf-8
from redis import *
#	链接Redis
sr = StrictRedis(host="localhost", port=6379, db=0)
# html.text是爬取到的单词信息
with open("chinese.txt",'r') as f:
    t = f.readlines()
# 判断是否是中文，ord()返回字符的ascii码
def ord_num(word):
    return ord(word)<127

num = 1
for i in t:
    n = 0
    for j in i:
        if ord_num(j):
            n += 1
        else:
            break
    key = i[0:n-1]
    value = i[n:]
    sr.hset(str(num),key, value)
    num += 1
