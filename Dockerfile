FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./package.json ./package-lock.json .
COPY prisma ./prisma/
RUN npm install
COPY build/ /opt/app/build
COPY src/ .
RUN pwd
ENV JWT_SECRET="234ASD234"
EXPOSE 3333
CMD [ "npm", "start"]

