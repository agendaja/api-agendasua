import { app } from "./app";
import { env } from "./env";

app.listen({
  host: 'localhost',
  port: env.PORT,
}).then((err) => {
  console.log('Host', err)
  console.log('HTTP Server Running!')
})