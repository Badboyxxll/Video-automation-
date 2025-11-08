import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      message: "Server running successfully"
    });
  });

  app.post("/generate-video", (req, res) => {
    const { topic, script } = req.body;
    
    if (!topic && !script) {
      return res.status(400).json({
        status: "error",
        message: "Either 'topic' or 'script' field is required"
      });
    }

    const content = topic || script;
    
    const slides = [
      {
        id: 1,
        text: `${content} is transforming industries worldwide.`
      },
      {
        id: 2,
        text: "From healthcare to finance, automation is growing rapidly."
      },
      {
        id: 3,
        text: "Advanced technologies are reshaping how we work and live."
      },
      {
        id: 4,
        text: "The future holds endless possibilities for innovation."
      }
    ];

    res.json({
      status: "success",
      topic: content,
      slides: slides,
      total_slides: slides.length
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
