export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { q, source, target } = JSON.parse(req.body);

      const response = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
          q,
          source,
          target,
          format: "text"
        }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Translation failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
