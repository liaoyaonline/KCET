#!/bin/bash
curl -s 'http://dict.youdao.com/search?q='$keyword'' | awk 'BEGIN{j=0;i=0;} {if(/phrsListTab/){i++;} if(i==1){print $0; if(/<\/ul>/){i=0;}} if(/collinsToggle/){ j++;} if(j==1) {print $0; if(/<\/ul>/){j=0;}}}' > $TEM_FILE
