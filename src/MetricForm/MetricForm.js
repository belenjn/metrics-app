import React, { useState } from "react";
import moment from "moment";
import publishMetric from "../utils/publishMetric";

import "./MetricForm.css";

const MetricForm = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
    const metric = { timestamp, name, value };

    await publishMetric(metric);
    setName("");
    setValue("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Value:
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            required
          />
        </label>
        <br />
        <button type="submit">Publish metric</button>
      </form>
    </div>
  );
};

export default MetricForm;
