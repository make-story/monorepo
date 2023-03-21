#!/bin/bash

SVC_PATH=/data/app
CD_PATH=/data/codedeploy/apps/mall

SERVER_ARGS="--name apcpfe -i max -o /data/logs/node/server.log -e /data/logs/node/server.error.log --log-date-format 'YYYY-MM-DDTHH:mm:ss.SSS' --merge-logs --max-memory-restart 1200M"
NODE_ENV="production"

#rm -rf ${SVC_PATH}
#mv ${CD_PATH}/target ${SVC_PATH}

cd ${CD_PATH}

npm rebuild
#nohup npm run start > /dev/null 2>&1 &
NODE_ENV=${NODE_ENV} SERVER_ARGS=${SERVER_ARGS} npm run start
