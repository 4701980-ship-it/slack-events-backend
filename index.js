import express from "express";
const app = express();
app.use(express.json());

// Slack URL verification + events
app.post("/slack/events", (req, res) => {
  // 1) URL verification
  if (req.body?.type === "url_verification") {
    return res.send(req.body.challenge);
  }

  // 2) Example: handle app_home_opened
  if (req.body?.event?.type === "app_home_opened") {
    // بعد میں client.chat.postMessage وغیرہ یہاں کریں (chat:write کے ساتھ)
    console.log("App home opened by:", req.body.event.user);
  }

  return res.status(200).send(); // Always ack within 3s
});

// health check
app.get("/", (_req, res) => res.send("Slack App is running!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
