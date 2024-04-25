import React, { createContext, useEffect, useState } from "react";
import getMetrics from "../utils/getMetrics";

const MetricContext = createContext();

const MetricProvider = ({ children }) => {
  const [metrics, setMetrics] = useState([]);

  const fetchMetrics = async () => {
    try {
      const data = await getMetrics();
      if (data.length > 0) {
        setMetrics(data);
      }
    } catch (error) {
      console.error("Error fetching metrics data:", error);
    }
  };

  useEffect(() => {
    fetchMetrics();

    const intervalId = setInterval(fetchMetrics, 60000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <MetricContext.Provider value={{ metrics, fetchMetrics }}>
      {children}
    </MetricContext.Provider>
  );
};

export { MetricContext, MetricProvider };
