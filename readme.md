# KCET
## 介绍
为了能够刷英语真题过英语四级，我需要一个程序来辅助我做题。我的刷题思路是这样的。第一步，在真题中标出我不会的单词。第二步，死记硬背，联系到原文去理解。第三步，通读原文，去做题，如果做不会跳转到第二步。如果做的会，跳转到下一步，从第一步开始。但是我遇到的问题有：

- 每次手动去搜索不会的单词，然后抄写太繁琐了，而且我字写的丑，加倍繁琐。我需要一个程序能够将我不会的单词批量翻译出来，输出到制定文档里面。

- 有个程序能够不断的给我考教我单词意思，辅助我记忆。
我做了这个程序，它可以实现我想要的一些功能，比如单词的批量翻译，具体的话就是新建一个名为english.txt的文档，每一行是一个单词。完成后通过kcet -b 执行，然后在当前文件夹
会出现一个chinese.txt的文档，那个就是结果了。当然这个还不完善，大家有想要的功能，或者发现bug都可以提出来
我会在空闲的时候撸代码。当然，如果有人能加入进来，非常欢迎。
## 下载安装

```cpp
git clone git@github.com:liaoyaonline/KCET.git
sudo bash install.sh
```
## 运行
```cpp
Usage: kcet [OPTIONS] [SOURCE]
 
Information options:
    -V  -version
        Print version and exit.
    -H  -help
        Print help message and exit.
    -C  -copy
        Back up files that have already been prepared
    -M  -Mkdir
        Back up the file and save it to a new folder
    -B  -batch
        translate batch words by the wordfile of the word dir.
```
## 用例
```cpp
kcet -h         //提供帮助包括对参数的说明
kcet -v         //显示版本号
kcet hello     //翻译hello
kcet -a hello  //翻译hello，并且显示用例
kcet -c ONEQ              //将文件进行备份，新文件的名字为englishONEQ
kcet -m 20170601     //创建一个文件夹20170601将所有翻译好的文件复制过去，然后将文件夹20170601放入history文件夹里面
kcet -b           //将english.txt里面的所有单词翻译为中文输出到chinese.txt
```
