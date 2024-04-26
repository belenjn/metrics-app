import { API_URL } from "../env";
import { strings } from "./strings";

const publishMetric = async (metric) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(metric),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error(strings.errors.publishMetric, responseData);
  }
};

export default publishMetric;
