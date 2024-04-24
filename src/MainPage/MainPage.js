import React from "react";
import MetricForm from "../MetricForm/MetricForm";
import { Metrics } from "../Metrics/Metrics";

import "./MainPage.css";

export const MainPage = () => {
  return (
    <div className="container">
      <MetricForm />
      <Metrics />
    </div>
  );
};
