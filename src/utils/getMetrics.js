import { API_URL } from "../env";
import { strings } from "./strings";

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
      throw new Error(strings.errors.getMetrics);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getMetrics;
