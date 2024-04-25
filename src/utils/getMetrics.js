import { API_URL } from "../env";

const getMetrics = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      console.error("Error fetching metrics:", responseData);
      throw new Error("Error fetching metrics");
    }
  } catch (error) {
    console.error("Error durante la solicitud de datos:", error);
    throw error;
  }
};

export default getMetrics;
