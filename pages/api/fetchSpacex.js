import axios from "axios";

// const API_URL =
//   "https://lldev.thespacedevs.com/2.2.0/agencies/?mode=detailed&search=spacex";

const API_URL =
  "https://ll.thespacedevs.com/2.2.0/agencies/?mode=detailed&search=spacex";

export default async function handler(req, res) {
  try {
    const response = await axios.get(API_URL);
    const launches = response.data.results;
    res.status(200).json(launches);
  } catch (error) {
    console.error("Error fetching upcoming launches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
