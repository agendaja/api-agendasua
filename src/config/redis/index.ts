import { env } from "@/env";

export default {
  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  }
}