import { env } from "@/env";
import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2(
  env.CLIENT_ID,
  env.CLIENT_SECRET,
  env.REDIRECT_URL
)
