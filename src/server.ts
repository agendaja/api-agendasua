import { app } from "./app";
import { env } from './env';
import CreateGoogleEvent from "./jobs/CreateGoogleEvent";
import GoogleEventQueue from "./lib/queue";


GoogleEventQueue.process(CreateGoogleEvent.handle)

app.listen({
  port: env.PORT,
}).then((host) => {
  console.log(host)
  console.log('HTTP Server Running!🚀')
})