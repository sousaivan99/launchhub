import axios from "axios";

const API_URL = "https://ll.thespacedevs.com/2.2.0/api-throttle/";

export default async function handler(req, res) {
  try {
    const response = await axios.get(API_URL);
    console.log("API Response:", response);
    const api = response.data;
    res.status(200).json(api);
  } catch (error) {
    console.error("Error fetching API Requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
