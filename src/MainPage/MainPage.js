import React from "react";
import MetricForm from "../MetricForm/MetricForm";
import { Metrics } from "../Metrics/Metrics";

import "./MainPage.css";
import { Footer } from "../Footer/Footer";

export const MainPage = () => {
  return (
    <div className="container">
      <MetricForm />
      <Metrics />
      <Footer />
    </div>
  );
};
