import express from "express";
import axios from "axios";
import cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200" || "https://thefreakylink.onrender.com"],
  })
);
