#!/bin/sh
set -e
envsubst "$(printf '${%s}' $(env | sed 's/=.*//'))" < /etc/nginx/conf.d/vhost.template > /etc/nginx/conf.d/default.conf
echo >&3 "$0: Configured /etc/nginx/conf.d/default.conf from template and env"
exit 0