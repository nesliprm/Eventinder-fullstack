import "./utils/instrument.js";
import * as Sentry from "@sentry/node";
import express from "express";
import eventsRouter from "./routes/events.js";
import usersRouter from "./routes/users.js";
import categoriesRouter from "./routes/categories.js";
import loginRouter from "./routes/login.js";
import { loggerMiddleware } from "./middleware/loggerMiddleware.js";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(loggerMiddleware);

app.use("/events", eventsRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use(Sentry.Handlers.errorHandler());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
