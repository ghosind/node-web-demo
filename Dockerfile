FROM node:16-alpine3.11

ENV NODE_ENV production

WORKDIR /usr/app

COPY ["package.json", "package-lock.json", "./"]

RUN \
  # Install building dependencies
  apk --no-cache --virtual \
    build-dependencies \
    add \
    python3 \
    make \
    g++ \
  # Install dependencies with production mode.
  && npm install --production \
  # Uninstall building dependencies to reduce image size.
  && apk del build-dependencies

COPY app ./app

# Change expose port if not using 8000.
EXPOSE 8000

CMD ["npm", "start"]
