import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js";

import "./config/mongoose.js";

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.set("etag", false);

app.use("/api", routes);

app.listen(port, () =>
  console.log(`Listening on http://localhost:${port}/api`)
);
