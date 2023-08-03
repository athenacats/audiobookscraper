import express from "express";
import axios from "axios";
import { load } from "cheerio";
import cors from "cors";
import Bottleneck from "bottleneck";

export const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173/",
  })
);

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 5000,
});

app.get("/scrape", async (req, res) => {
  const url = "http://theaudiobookbay.cc/";
  try {
    const response = await limiter.schedule(() => axios.get(url));
    console.log(response);
    const html = response.data;

    const $ = load(html);
    const audiobooks: { title: string }[] = [];
    $(".product-list").each((index, element) => {
      const title = $(element).text().trim();
      audiobooks.push({ title });
    });
    res.json(audiobooks);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
