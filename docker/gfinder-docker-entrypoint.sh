#!/bin/sh

set -e

if [[ -z "${DATABASE_URL}" ]]; then
    echo "NOT HEROKU"  
else

export NODE_OPTIONS="--max_old_space_size=450"

#DATABASE_URL
proto="`echo $DATABASE_URL | grep '://' | sed -e's,^\(.*://\).*,\1,g'`"
url=`echo $DATABASE_URL | sed -e s,$proto,,g`
userpass="`echo $url | grep @ | cut -d@ -f1`"
pass=`echo $userpass | grep : | cut -d: -f2`
if [ -n "$pass" ]; then
    user=`echo $userpass | grep : | cut -d: -f1`
else
    user=$userpass
fi
hostport=`echo $url | sed -e s,$userpass@,,g | cut -d/ -f1`
port=`echo $hostport | grep : | cut -d: -f2`
if [ -n "$port" ]; then
    host=`echo $hostport | grep : | cut -d: -f1`
else
    host=$hostport
fi
database="`echo $url | grep / | cut -d/ -f2-`"

#REDISCLOUD_URL
redis_proto="`echo $REDISCLOUD_URL | grep '://' | sed -e's,^\(.*://\).*,\1,g'`"
redis_url=`echo $REDISCLOUD_URL | sed -e s,$redis_proto,,g`
redis_userpass="`echo $redis_url | grep @ | cut -d@ -f1`"
redis_pass=`echo $redis_userpass | grep : | cut -d: -f2`
if [ -n "$redis_pass" ]; then
    redis_user=`echo $redis_userpass | grep : | cut -d: -f1`
else
    redis_user=$redis_userpass
fi
redis_hostport=`echo $redis_url | sed -e s,$redis_userpass@,,g | cut -d/ -f1`
redis_port=`echo $redis_hostport | grep : | cut -d: -f2`
if [ -n "$redis_port" ]; then
    redis_host=`echo $redis_hostport | grep : | cut -d: -f1`
else
    redis_host=$redis_hostport
fi

export REDISCLOUD_URL=${REDISCLOUD_URL}redis-gfinder-10155814
cat <<EOF > /app/.env
APP_ENV=dev
APP_URL=https://gfinder.herokuapp.com
APP_PORT=$PORT
WEB_PORT=443
DB_TYPE=postgres
DB_AUTH=true
DB_USERNAME=$user
DB_PASSWORD=$pass
DB_HOST=$host
DB_PORT=$port
DB_DATABASE=$database
DB_MODE=DEV
DB_LOGGING=error
RUN_MIGRATIONS=true
DB_CACHE=true
DB_CACHE_AUTH=true
DB_CACHE_USER=$redis_user
DB_CACHE_PASSWORD=$redis_pass
DB_CACHE_HOST=$redis_host
DB_CACHE_PORT=$redis_port
DB_CACHE_DATABASE=redis-gfinder-10155814
DB_CACHE_MILLIS=30000
DB_CACHE_TYPE=ioredis
REDISCLOUD_URL=${REDISCLOUD_URL}redis-gfinder-10155814
NODE_ENV=development
EOF
fi
source /app/.env

if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ]; then
  set -- node "$@"
fi


exec "$@"
