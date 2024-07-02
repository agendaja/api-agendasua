import { app } from "./app";
import { env } from './env';
import Queue from "./lib/queue";


Queue.process()

app.listen({
  //** Make sure that you have the propertie "host: '0.0.0.0'" before deploying the application  */
  host: '0.0.0.0',
  port: env.PORT,
}).then((host) => {
  console.log(host)
  console.log('HTTP Server Running!🚀')
})