# KCET
## 介绍
为了能够刷英语真题过英语四级，我需要一个程序来辅助我做题。我的刷题思路是这样的。第一步，在真题中标出我不会的单词。第二步，死记硬背，联系到原文去理解。第三步，通读原文，去做题，如果做不会跳转到第二步。如果做的会，跳转到下一步，从第一步开始。但是我遇到的问题有：

- 每次手动去搜索不会的单词，然后抄写太繁琐了，而且我字写的丑，加倍繁琐。我需要一个程序能够将我不会的单词批量翻译出来，输出到制定文档里面。

- 有个程序能够不断的给我考教我单词意思，辅助我记忆。

## 下载安装
```cpp
git clone https://github.com/soimort/translate-shell.git
sudo bash linux_fanyi.sh
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
./kcet.sh hello                       //翻译hello
./kcet.sh -c ONEQ              //将文件进行备份，新文件的名字为englishONEQ
./kcet.sh -m 20170601     //将文件备份到文件夹里面，文件夹的名字为20170601
./kcet.sh -b           //将english.txt里面的所有单词翻译为中文输出到chinese.txt
```
