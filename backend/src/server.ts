import express from "express";
import axios from "axios";
import cheerio, { load } from "cheerio";
import cors from "cors";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.get("/scrape", async (req, res) => {
  const url = "http://theaudiobookbay.cc/";
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = load(html);
    let audiobooks: { title: string }[] = [];
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
