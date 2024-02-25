import { app } from "./app";
import { env } from "./env";

app.listen({
  host: '0.0.0.0',
  port: env.PORT,
}).then((err) => {
  console.log('Host', err)
  console.log('HTTP Server Running!')
})