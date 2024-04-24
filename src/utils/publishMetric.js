import { API_URL } from "../env";

const publishMetric = async (metric) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(metric),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  if (response.ok) {
    console.log("New metric created", responseData);
  } else {
    console.error("Error publishing metric", responseData);
  }
};

export default publishMetric;
