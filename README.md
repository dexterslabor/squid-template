## Prerequisites

* node from v16
* docker

## Quick setup

```bash
# 1. Install dependencies
npm ci

# 2. Compile typescript files
npm run clean-and-setup
#    To start the graphql server open the separate terminal
#    and run
npx squid-graphql-server
# explore at https://graphiql-online.com/graphiql with endpoint http://localhost:4350/graphql
```
