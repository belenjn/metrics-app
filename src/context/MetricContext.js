import React, { createContext, useState, useEffect } from "react";
import fetchMetrics from "../utils/fetchMetrics";

const MetricContext = createContext();

const MetricProvider = ({ children }) => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const loadMetrics = async () => {
      const data = await fetchMetrics();
      if (data.length > 0) {
        setMetrics(data);
      }
    };

    loadMetrics();
  }, []);

  return (
    <MetricContext.Provider value={{ metrics, setMetrics }}>
      {children}
    </MetricContext.Provider>
  );
};

export { MetricContext, MetricProvider };
