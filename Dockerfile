FROM node:18-alpine

WORKDIR /usr/app


ENV TZ="America/Sao_Paulo"

ENV JWT_SECRET="ebb779d2-5418-405b-9e63-d0e603f08a98"

ENV MAILER_EMAIL="suporte.agendasua@gmail.com"
ENV MAILER_KEY="vsfi fmnp xkmt vtqj"

ENV CLIENT_ID="612569825207-lsd9jj16c5caif508fv4dlrsa7rt2giv.apps.googleusercontent.com"
ENV CLIENT_SECRET="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"

ENV REDIRECT_URL="https://api.agendasua.com.br/google/redirect"

ENV API_KEY="AIzaSyCtMqi5ocD9WeydSjTtvUWe9sGsrMo6C3s"

ENV WEBSITE_URL="https://agendasua.com.br"

ENV REDIS_HOST=10.255.248.59
ENV REDIS_PORT=6379

COPY package*.json ./

RUN npm install 

COPY . ./

RUN npx prisma generate

RUN npm run build

EXPOSE 3333

CMD ["npm", "start"]
