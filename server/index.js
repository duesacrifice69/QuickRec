import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"; // for http header security
import morgan from "morgan"; // request loggers
import sql from "mssql";
import path from "path";
import { fileURLToPath } from "url";
import DBconfig from "./dbconfig.js";
import userRoutes from "./src/routes/userRoutes.js";
import applicationRoutes from "./src/routes/applicationRoutes.js";
import commonRoutes from "./src/routes/commonRoutes.js";
import vacancyRoutes from "./src/routes/vacancyRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";

/* CONFIGURATION */
const app = express();
const appPool = new sql.ConnectionPool(DBconfig);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use(express.json());

app.use(
  helmet({
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* ROUTES */
app.use("/user", userRoutes);
app.use("/application", applicationRoutes);
app.use("/vacancy", vacancyRoutes);
app.use("/common", commonRoutes);
app.use("/download", commonRoutes);
app.use("/report", reportRoutes);

var port = process.env.PORT || 5000;
appPool
  .connect()
  .then(function (pool) {
    app.locals.db = pool;
    const server = app.listen(port, function () {
      const host = server.address().address;
      const port = server.address().port;
      console.log(
        "QuickRec Backend Server is Running at http://%s:%s",
        host,
        port
      );
    });
  })
  .catch(function (err) {
    console.error("ERROR starting server ", err);
  });

process.once("SIGUSR2", function () {
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, "SIGINT");
});
