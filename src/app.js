import express from "express";
import config from "./Connection/config.js";
import cors from "cors";
import routes from "./Connection/Routes/routes.js";
import morgan from "morgan";

const app = express();
app.set("port", config.port);

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

export default app;
