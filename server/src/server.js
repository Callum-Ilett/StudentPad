import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js";
import path from "path";
import "./config/mongoose.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.set("etag", false);

app.use("/", express.static(__dirname + "/public"));
app.use("/api", routes);

// // The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

app.listen(port, () =>
  console.log(`Listening on http://localhost:${port}/api`)
);
