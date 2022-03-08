process: migrate
	@node -r dotenv/config lib/processor.js


serve:
	@npx squid-graphql-server


migrate:
	@npx sqd db:migrate


migration:
	@npx sqd db:create-migration Data


build:
	@npm run build


codegen:
	@npx sqd codegen


typegen: kusamaVersions.json
	@npx squid-substrate-typegen typegen.json


kusamaVersions.json:
	@make explore


explore:
	@npx squid-substrate-metadata-explorer \
		--chain wss://archive.snakenet.hydradx.io \
		--archive http://snakenet-indexer.hydration.cloud:4010/v1/graphql \
		--out hydradxVersions.json

up:
	@docker-compose up -d


down:
	@docker-compose down


.PHONY: process serve start codegen migration migrate up down
