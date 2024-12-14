import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: true,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const port = 8000;

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/province", async (req, res) => {
  const url = "https://api.rajaongkir.com/starter/province";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        key: "f04600f9bfae98152518bf9b6cb3cc8b",
      },
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "There was a problem with the fetch operation" });
  }
});
app.get("/city", async (req, res) => {
  const url = "https://api.rajaongkir.com/starter/city";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        key: "f04600f9bfae98152518bf9b6cb3cc8b",
      },
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "There was a problem with the fetch operation" });
  }
});
app.get("/cost", async (req, res) => {
  const url = "https://api.rajaongkir.com/starter/cost";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        key: "f04600f9bfae98152518bf9b6cb3cc8b",
      },
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "There was a problem with the fetch operation" });
  }
});

app.post("/cost", async (req, res) => {
  // const { origin, destination, weight, courier } = req.body;

  // if (!origin || !destination || !weight || !courier) {
  //   return res.status(400).json({ error: "Missing required fields" });
  // }
  const { origin, destination } = req.body;

  if (!origin || !destination) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const url = "https://api.rajaongkir.com/starter/cost";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        key: "f04600f9bfae98152518bf9b6cb3cc8b",
        "Content-Type": "application/x-www-form-urlencoded",
      },

      body: new URLSearchParams({
        origin,
        destination,
        weight: "1000",
        courier: "jne",
      }),
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "There was a problem with the fetch operation" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
