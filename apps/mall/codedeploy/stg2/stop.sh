#!/bin/bash

SVC_PATH=/data/app
CD_PATH=/data/codedeploy

cd ${CD_PATH}

npm run stop || true
#NODE_PID=`ps -ef | grep node | grep server | awk '{print $2}'`
#kill -9 $NODE_PID

NODE_PID=`ps -ef | grep node | grep /home | grep God | awk '{print $2}'`
kill -9 $NODE_PID
