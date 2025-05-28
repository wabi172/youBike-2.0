import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());

app.get("/proxy", async (req, res) => {
  const targetUrl =
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";

  try {
    const result = await fetch(targetUrl);
    if (!result.ok) throw Error(`error!!`);
    const data = await result.json();
    console.log(data);
    res.status(200).json(data)

  } catch (err) {
    console.error("Proxy error:", err);
    res.status(400).json({ error: "Failed to fetch" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
