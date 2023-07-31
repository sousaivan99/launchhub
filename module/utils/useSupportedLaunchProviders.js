import { useState, useEffect } from "react";

const useSupportedLaunchProviders = (launches) => {
  const [filteredLaunches, setFilteredLaunches] = useState([]);

  const supportedProviders = ["SpaceX", "Rocket Lab"];

  useEffect(() => {
    if (launches) {
      const filteredLaunches = launches.filter((launch) =>
        supportedProviders.includes(launch.launch_service_provider.name)
      );
      setFilteredLaunches(filteredLaunches);
    }
  }, [launches]);

  return filteredLaunches;
};

export default useSupportedLaunchProviders;
