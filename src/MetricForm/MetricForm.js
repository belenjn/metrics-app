import React, { useState } from "react";
import moment from "moment";
import publishMetric from "../utils/publishMetric";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./MetricForm.css";

const MetricForm = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
    const metric = { timestamp, name, value };

    try {
      await publishMetric(metric);

      toast.success("Metric created successfully!");

      setName("");
      setValue("");
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Form to enter your values:</h2>

        <div className="label-container">
          <div className="label-container--child">
            <label className="label">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <br />
          <div className="label-container--child">
            <label className="label">Value:</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value))}
              required
              className="form-input"
            />
          </div>
        </div>

        <br />
        <ToastContainer theme="dark" />
        <button type="submit" className="submit-button">
          Publish metric
        </button>
      </form>
    </div>
  );
};

export default MetricForm;
