import getMetrics from "../utils/getMetrics";

const fetchMetrics = async () => {
  try {
    const data = await getMetrics();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchMetrics;
