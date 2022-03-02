import axios from "axios";

export async function fetchFeatured() {
  try {
    const response = await axios.get("/api/featured");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
