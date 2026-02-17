import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.route.js";
import { customersRouter } from "./routes/customers.route.js";
import { providersRouter } from "./routes/providers.route.js";
import { sequelize } from "./db/db.js";
import { models } from "./db/db.js";
const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://ranked-resort-required-provincial.trycloudflare.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
  optionsSuccessStatus: 200,
}));

const port = process.env.PORT;
//db init

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// console.log((await models.cities.findAll()).map(x=>x.name));

app.get("/chk", (req, res) => {
  res.send("Hello World!");
});

// Support both /auth and /api/auth endpoints
app.use("/auth", authRouter);
app.use("/api/auth", authRouter);
app.use("/api/customers", customersRouter);
app.use("/api/providers", providersRouter);

app.listen(port, () => console.log("listening on port " + port));
