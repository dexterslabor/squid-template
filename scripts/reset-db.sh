set -e
npx sqd codegen
rm -rf db/migrations/*.js
npx sqd db drop
npx sqd db create
npx sqd db create-migration Init
npx sqd db migrate