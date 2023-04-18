FROM hub.c.163.com/library/nginx
VOLUME /tmp
ENV LANG en_US.UTF-8

RUN rm /etc/nginx/conf.d/default.conf

ADD default.conf /etc/nginx/conf.d/

ADD dist/ /var/www/html/
EXPOSE 8088
