import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { timing } from "hono/timing";

import { report } from "./routes/report";

const app = new Hono();

app.use(logger());
app.use(timing());

app.get("/", (c) => c.text("Hello, Hono!"));

app.get("/greet/:name", (c) => {
  const name = c.req.param("name");

  return c.json({ message: `Hello, ${name}!` });
});

app.get("/search", (c) => {
  const query = c.req.query("q") ?? "";

  return c.json({ query });
});

app.route("/", report);

const port = 3000;

serve({ fetch: app.fetch, port }, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`);
});
