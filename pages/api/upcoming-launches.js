import axios from "axios";

const API_URL =
  "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=100&mode=detailed";

export default async function handler(req, res) {
  try {
    const response = await axios.get(API_URL);
    const launches = response.data.results;

    // List of supported launch service providers
    const supportedProviders = ["SpaceX", "Rocket Lab", "Blue Origin", "NASA"];

    // Filter the launches based on the supported providers and status
    const filteredLaunches = launches.filter(
      (launch) =>
        launch.status.abbrev !== "Success" &&
        supportedProviders.includes(launch.launch_service_provider.name)
    );

    res.status(200).json(filteredLaunches);
  } catch (error) {
    console.error("Error fetching upcoming launches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
