import { google } from 'googleapis'
import { env } from "@/env";

export const calendar = google.calendar({
  version: "v3",
  auth: env.API_KEY,
})