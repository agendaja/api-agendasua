FROM node:18-alpine

WORKDIR /usr/app

ENV JWT_SECRET=ebb779d2-5418-405b-9e63-d0e603f08a98

ENV DATABASE_URL=postgresql://postgres:LLEiaVeo6rSG@35.231.110.34:5432/some-postgres?schema=public

ENV MAILER_EMAIL=sendmail845@gmail.com
ENV MAILER_KEY=oxxm btuu sxhl rpef

COPY package*.json ./

RUN npm install 

COPY . ./

RUN npx prisma generate

RUN npm run build

EXPOSE 3333

CMD ["npm", "start"]