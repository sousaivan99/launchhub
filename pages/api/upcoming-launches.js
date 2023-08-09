import axios from "axios";

const API_URL =
  "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10&mode=detailed";

export default async function handler(req, res) {
  try {
    const response = await axios.get(API_URL);
    console.log("launches Response:", response);
    const launches = response.data.results;

    // Filter the launches based on the supported providers and status
    const filteredLaunches = launches.filter(
      (launch) =>
        launch.status.abbrev !== "Success"
    );

    res.status(200).json(filteredLaunches);
  } catch (error) {
    console.error("Error fetching launches Requests:", error);
    res.status(500).json({ error: "Internal Server Error", message: error });
  }
}
