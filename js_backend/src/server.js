import express from "express";
import cors from "cors";
import pkg from "pg";
import clientProm from "prom-client";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST || "postgres",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD || "supersecret",
  database: process.env.DB_NAME || "portfolio",
});

// Prometheus metrics
const collectDefaultMetrics = clientProm.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestCounter = new clientProm.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["route", "method", "status"],
});

// middleware برای شمارش درخواست‌ها
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      route: req.path,
      method: req.method,
      status: res.statusCode,
    });
  });
  next();
});

// healthcheck
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "backend_node" });
});

// اطلاعات پروفایل
app.get("/api/public/profile", (req, res) => {
  res.json({
    name: "Hamid Hasani",
    title: "NLP / Backend / DevOps Engineer",
    description: "Building multi-service apps with Node, Python, Nginx and Docker.",
    github: "https://github.com/72hamidhasani",
  });
});

// لیست پروژه‌ها از دیتابیس
app.get("/api/public/projects", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, description, url FROM projects ORDER BY id"
    );
    res.json(rows);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "DB error" });
  }
});

// متریک‌ها
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", clientProm.register.contentType);
  res.end(await clientProm.register.metrics());
});

app.listen(PORT, () => {
  console.log(`✅ backend_node running on port ${PORT}`);
});

