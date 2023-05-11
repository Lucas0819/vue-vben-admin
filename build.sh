docker login 220.202.55.167:19004 -u riten -p Riten@2022

APP='220.202.55.167:19004/riten-monitor-ui-master:1.0.4'

rm -rf dist

npm install --registry https://registry.npm.taobao.org

npm run build

docker pull hub.c.163.com/library/nginx

docker build -t $APP .

docker push $APP

docker rmi $APP

#docker logout 192.168.0.2:19004
