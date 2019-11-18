#!/usr/bin/env python
# coding=utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf8')
from redis import *
import random
sr = StrictRedis(host="localhost", port=6379, db=0)

pr = {i:j for i,j in zip(['a','b','c','d'],[0,1,2,3])}
ans = ['a','b','c','d']
while True:
    index = [str(random.randint(1,46)) for i in range(4)]
    words = []
    for i in index:
        word = {}
        word['key'] = str(sr.hkeys(i)[0])
        word['value'] = sr.hvals(i)[0].decode().replace("\n","")
        words.append(word)
    print("词组“{}”的意思是：".format(words[0]["key"]))
    ges_list = [0,1,2,3]
    random.shuffle(ges_list)
    print("\n a.{}\n b.{}\n c.{}\n d.{}\n".format(words[ges_list[0]]['value'],
                                       words[ges_list[1]]['value'],
                                       words[ges_list[2]]['value'],
                                       words[ges_list[3]]['value']))

    ges = input("选择：")
    if ges not in ans:
        print("请选择a、b、c、d")
        print()
        continue
    if ges_list[pr[ges]] == 0:
        print("选择正确")
    else:
        print("错。正确答案是{}".format(ans[ges_list.index(0)]))
    print()
