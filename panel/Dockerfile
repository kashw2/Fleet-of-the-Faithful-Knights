FROM kyma/docker-nginx
COPY ./nginx.conf /etc/nginx/sites-enabled/default
COPY ./dist/panel /var/www
CMD 'sudo chown $USER:$USER /var/www'
CMD 'nginx'
EXPOSE 80
