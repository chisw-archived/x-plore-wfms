#!/bin/bash

# touch i.htm
# echo <!DOCTYPE html><html><script>location.href = './wfms/index.html'</script></html>

DIR=/Users/$(whoami)/WSJ/x-plore-wfms                          # 仓库目录
DIR_K="$DIR/apk/123123.jks"                                    # 签名文件，已生成，密码：123123
DIR_X="$DIR/apk/X-plore_v4.27.6"                               # apk 反编译后目录（既回编译目录）
DIR_D="$DIR/apk/X-plore_v4.27.6/dist"                          # 回编译构建结果目录
DIR_J=/usr/local/bin                                           # apktool 目录
DIR_A=/Users/$(whoami)/Library/Android/sdk/build-tools/30.0.0  # zipalign 目录
DIR_Z=/Users/$(whoami)/Library/Android/sdk/build-tools/30.0.0  # apksigner 目录

# 同步 wifi 文件夹
# cd $DIR_X && rm -rf assets/wifi && cp -r $DIR/wifi $DIR_X/assets/wifi && \
cd $DIR_X && rm -rf assets/wifi/wfms && cp -r $DIR/build $DIR_X/assets/wifi/wfms && \
# 清空上次编译结果
cd $DIR_X && rm -rf dist && \
# 回编译
cd $DIR_J && java -jar apktool.jar b $DIR_X && \
# V1 签名
jarsigner -verbose -keystore $DIR_K -signedjar $DIR_D/X-plore-wfms-v1.apk $DIR_D/X-plore_v4.27.6.apk 123123 && \
# 对齐
cd $DIR_Z && ./zipalign -v 4 $DIR_D/X-plore-wfms-v1.apk $DIR_D/X-plore-wfms-v1a.apk && \
# V2 签名
cd $DIR_A && ./apksigner sign --ks $DIR_K --ks-key-alias 123123 --out $DIR_D/X-plore-wfms-v2.apk $DIR_D/X-plore-wfms-v1a.apk && \
# 版本 + 压缩包
cd $DIR_D && mv X-plore-wfms-v2.apk X-plore-wfms-beta.apk && zip X-plore-wfms-beta.zip X-plore-wfms-beta.apk && \
# 清除
rm X-plore_v4.27.6.apk X-plore-wfms-v1.apk X-plore-wfms-v1a.apk X-plore-wfms-v2.apk.idsig
