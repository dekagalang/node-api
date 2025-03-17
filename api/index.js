import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = 3000;
const API_KEY = "f04600f9bfae98152518bf9b6cb3cc8b";
const BASE_URL = "https://api.rajaongkir.com/starter";

app.use(cors({
  origin: true,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

const fetchData = async (endpoint, method = "GET", body = null) => {
  const options = {
    method,
    headers: {
      key: API_KEY,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  if (body) options.body = new URLSearchParams(body);

  const response = await fetch(`${BASE_URL}/${endpoint}`, options);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

app.get("/province", async (req, res) => {
  try {
    const data = await fetchData("province");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/city", async (req, res) => {
  try {
    const data = await fetchData("city");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/cost", async (req, res) => {
  const { origin, destination, weight = "1000", courier = "jne" } = req.body;

  if (!origin || !destination) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const data = await fetchData("cost", "POST", { origin, destination, weight, courier });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
