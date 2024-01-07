import { Hono } from "hono"
import { cors } from "hono/cors"
import { showRoutes } from "hono/dev"

import { v1Router } from "./routes/v1"

export const createApp = () => {
  const app = new Hono<{ Bindings: Env }>()

  app.use(
    cors({
      origin: ["*"],
      allowMethods: ["GET"],
      credentials: false,
    }),
  )

  app.route("/v1", v1Router)

  app.get("/", (c) => c.redirect("https://github.com/BeeeQueue/dota-matches-api", 302))

  if (import.meta.env.MODE !== "production") {
    showRoutes(app)
  }

  return app
}
