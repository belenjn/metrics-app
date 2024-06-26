module.exports = function (app, databaseService) {
  app.get("/", (req, res) => {
    res.json({ message: "All ok" });
  });

  app.get("/metrics", async (req, res) => {
    try {
      const metrics = await databaseService.getAllMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Error reading metrics" });
      console.error(error);
    }
  });

  app.get("/metrics/:id", async (req, res) => {
    const metricId = req.params.id;
    try {
      const metric = await databaseService.getMetricById(metricId);
      if (metric) {
        res.json(metric);
      } else {
        res.status(404).json({ message: "404" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/metrics", async (req, res) => {
    const newMetric = req.body;
    try {
      await databaseService.createMetric(newMetric);
      res.json({ message: newMetric });
    } catch (error) {
      res.status(500).json(error);
    }
  });
};
