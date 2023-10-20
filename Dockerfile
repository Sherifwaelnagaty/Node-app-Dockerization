FROM node:14

WORKDIR /app

COPY package.json .

ARG NODE_DEV

RUN if [ "$NODE_DEV" = "production" ];\
    then npm install --only=production; \
    else npm install ; \
    fi
COPY . .

EXPOSE 4000

CMD ["npm", "start"]
