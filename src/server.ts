import dotenv from 'dotenv'
dotenv.config({})

import dayjs from 'dayjs'
import { app } from "./app";
import { env } from "./env";
import { google } from 'googleapis'
import {v4 as uuid} from 'uuid'

const calendar = google.calendar({
  version: "v3",
  auth: process.env.API_KEY,
})

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
)

const scopes = ['https://www.googleapis.com/auth/calendar'];
const token = "";

app.get("/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  res.redirect(url)
});

app.get('/google/redirect', async (req, res) => {
  const code = (req.query as { code: string }).code;

  const { tokens } = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens);

  
  res.send({
    msg: "Você fez login com sucesso"
  });
})

app.get('/schedule_event', async (req, res) => {

  const result = await calendar.events.insert({
    calendarId: "primary",
    auth: oauth2Client,
    conferenceDataVersion: 1,
    requestBody : {
    summary: "CALL AGENDA_SUA",
      description: "Evento de extrema importância",
      start: {
        dateTime : dayjs(new Date()).add(1, 'day').toISOString(),
        timeZone: "America/Sao_Paulo"
      },
      end: {
        dateTime : dayjs(new Date()).add(1, 'day').add(1, "hour").toISOString(),
        timeZone: "America/Sao_Paulo"
      },
      conferenceData : {
        createRequest: {
          requestId: uuid(),
        },
      },
      attendees : [{
        email : "araujomauriciohsja@gmail.com"
      }]
    },
  })

  res.send({
    msg: "Done",
  })
});

app.listen({
  host: '0.0.0.0',
  port: env.PORT,
}).then((err) => {
  console.log('Host', err)
  console.log('HTTP Server Running!')
})