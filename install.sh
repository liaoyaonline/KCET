#!/bin/bash
build(){
    sudo bash ./src/install_yd.sh
    sudo bash ./src/install_kcet.sh
}

test(){
    sudo bash ./tst/kcettest.sh
}
main(){
    build
    echo "KCET installation is successful, you can enter kcet -h to get help"
    echo "The next step is to test"
    #test
}
main
