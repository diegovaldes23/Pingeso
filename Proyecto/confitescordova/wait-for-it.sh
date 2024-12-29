#!/bin/bash
# wait-for-it.sh

host_port=$1
shift

host=$(echo $host_port | cut -d: -f1)
port=$(echo $host_port | cut -d: -f2)

while ! nc -z "$host" "$port"; do
  echo "Esperando a que $host:$port esté disponible..."
  sleep 2
done

echo "$host:$port está disponible. Ejecutando el siguiente comando..."
exec "$@"
