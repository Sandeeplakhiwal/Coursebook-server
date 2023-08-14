import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./Middlewares/Error.js";
import cookieParser from "cookie-parser";
import Cors from "cors";
import path from "path";

// Importing Routes
import course from "./Routes/courseRoutes.js";
import user from "./Routes/userRoutes.js";
import payment from "./Routes/paymentRoutes.js";
import other from "./Routes/otherRoutes.js";

const app = express();

config({
  path: "./Config/Config.env",
});

// Using Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(
  Cors({
    origin: "https://coursebook-sigma.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Using Routes
app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

// Serve static files from the 'build' directory (your compiled React app)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle all routes by serving the 'index.html' file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.get("/", (req, res) => {
  res.send("<h1>Coursebook official server.</h1>");
});

export default app;

app.use(ErrorMiddleware);
