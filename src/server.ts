import { app } from "./app";
import { env } from './env';

app.listen({
  port: env.PORT,
}).then((host) => {
  console.log(host)
  console.log('HTTP Server Running!🚀')
})