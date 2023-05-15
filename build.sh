docker login 8.146.200.64:5000 -u doupiao -p doupiao@2023

APP='8.146.200.64:5000/dp-master-ui-test:1.0.0'

npm run build

docker pull hub.c.163.com/library/nginx

docker build -t $APP .

docker push $APP

docker rmi $APP

docker logout 8.146.200.64:5000
