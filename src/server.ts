import { app } from "./app";
import { env } from './env';
import CreateGoogleEvent from "./jobs/CreateGoogleEvent";
import Queue from "./lib/queue";


Queue.process()

app.listen({
  port: env.PORT,
}).then((host) => {
  console.log(host)
  console.log('HTTP Server Running!🚀')
})