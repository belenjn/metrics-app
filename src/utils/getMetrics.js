import { API_URL } from "../env";

const getMetrics = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  if (response.ok) {
    console.log("Get metrics successfully", responseData);
    return responseData;
  } else {
    console.error("Error reading metric", responseData);
  }
};

export default getMetrics;
