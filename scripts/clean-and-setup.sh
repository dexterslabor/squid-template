set -e
make down
rm -rf src/model src/types db/migrations/*.js

make up
make codegen typegen build
sleep 5
make reset-db
sleep 5
make process
