import React, { useContext, useEffect } from "react";
import { MetricContext } from "../context/MetricContext";

const WebSocketConnection = ({ fetchMetrics }) => {
  const { setMetrics } = useContext(MetricContext);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3100");

    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "NEW_INSERTIONS") {
        const data = await fetchMetrics();
        if (data.length > 0) {
          setMetrics(data);
        }
      }
    };

    return () => {
      ws.close();
    };
  }, [fetchMetrics, setMetrics]);

  return null;
};

export default WebSocketConnection;
