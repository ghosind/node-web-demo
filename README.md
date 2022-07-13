# Node.js Web Demo

A simple Node.js Web project demo.

## Requirements

- Node.js 16
- Docker
- MySQL

## Getting Start

### Run with local Node.js

1. Install dependencies with `npm install` or `yarn install`.
2. Copy the `example.env` file to `.env` and fill in the values.
3. Run `npm run dev` or `yarn dev` to start the server.

### Run with Docker

1. Compile Typescript codes with `npm run build` or `yarn build`.
2. Execute `docker build -t <image-name> .` to build the Docker image.
3. Execute `docker run -p 3000:3000 -d <image-name>` to start the server.
    - Specify the configurations with `-e` option, like `docker run -e KEY1=VAL1 -e KEY2=VAL2`
    - Specify the configuration file with `--env-file` option, like `docker run --env-file .env`

## Get users

You can call `POST /user` api to generate a new user with random email and password.

## Configurations

- `KEY_SECRET`: the private key used to sign the JWT tokens.
- `DB_NAME`: the name of the database.
- `DB_HOST`: the host of the database.
- `DB_PORT`: the listening port of the database.
- `DB_USER`: the user of the database.
- `DB_PASS`: the password of the database.
