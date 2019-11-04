# 四六级真题辅助程序
[TOC]
## 需求
为了能够刷英语真题过英语四级，我需要一个程序来辅助我做题。我的刷题思路是这样的。第一步，在真题中标出我不会的单词。第二步，死记硬背，联系到原文去理解。第三步，通读原文，去做题，如果做不会跳转到第二步。如果做的会，跳转到下一步，从第一步开始。但是我遇到的问题有：

- 每次手动去搜索不会的单词，然后抄写太繁琐了，而且我字写的丑，加倍繁琐。我需要一个程序能够将我不会的单词批量翻译出来，输出到制定文档里面。

- 有个程序能够不断的给我考教我单词意思，辅助我记忆。

## 解决思路
- 关于第一个批量翻译，可以借用一些API接口调用google翻译，百度翻译，有道翻译进行翻译，这个有现成的。我要做的是找到这样一个软件，然后使用shell脚本，批量调用程序将多个单词翻译出来输出到制定文档。

- 关于第二个，可以借用redis，将翻译好的文档压入redis，最好能够有序列，这样可以使用随机数，选择其中的四个，做为选择项目。选择四个中的一个做为答案和题目。这个有在网上看到过，调用一下阔以。
## 代码
- 批量翻译代码
- 脚本代码
- 执行步骤
```cpp
git clone 
make
bash xx.sh
```



- 随机单词代码
- 将单词加入redis
- 不断出题
## 运行截图
