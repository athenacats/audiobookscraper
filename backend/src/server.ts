import express from "express";
import axios from "axios";
import { load } from "cheerio";
import cors from "cors";
import Bottleneck from "bottleneck";
import searchRouter from "./routers/search.router";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 5000,
});

app.get("/api", async (req, res) => {
  const url = "http://theaudiobookbay.cc/";
  try {
    const response = await limiter.schedule(() => axios.get(url));
    const html = response.data;

    const $ = load(html);
    console.log($);
    const audiobooks: {
      title: string;
      link: string;
      img: string | undefined;
    }[] = [];
    $("div.post").each((index, element) => {
      const titleElement = $(element);
      const title = titleElement.find("div.postTitle h2").text().trim();
      const link = url + titleElement.find("a").attr("href");
      const img = titleElement.find("img").attr("src");
      audiobooks.push({ title, link, img });
    });
    res.json(audiobooks);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api", searchRouter);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
);

const PORT: number = parseInt((process.env.PORT || "3000") as string, 10);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
