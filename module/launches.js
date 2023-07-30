"use client";
import React, { useState, useEffect } from "react";
import Countdown from "./utils/countdown";
import TitleCountDown from "./utils/titleCountDown";
import axios from "axios";
import "@css/launches.css";
import "react-tooltip/dist/react-tooltip.css";
import Confetti from "react-confetti";
import { Tooltip } from "react-tooltip";
import Link from "next/link";

function Launches() {
  const [upcomingLaunches, setUpcomingLaunches] = useState(null);
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [hasDisplayedConfetti, setHasDisplayedConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (upcomingLaunches !== null) {
      console.log(upcomingLaunches);
    }
  }, [upcomingLaunches]);

  useEffect(() => {
    const fetchUpcomingLaunches = async () => {
      try {
        const response = await axios.get("/api/upcoming-launches");
        const data = response.data; // Data is already the upcoming launch object
        setUpcomingLaunches(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching upcoming launches:", error);
      }
    };

    fetchUpcomingLaunches();
  }, []);

  const upcomingLaunchesToShow = upcomingLaunches
    ? upcomingLaunches.filter((launch) => launch.status.abbrev !== "Success")
    : [];

  useEffect(() => {
    if (!hasDisplayedConfetti && upcomingLaunchesToShow.length > 0) {
      const firstLaunch = upcomingLaunchesToShow[0];
      const targetTimestamp = new Date(firstLaunch.net).getTime();

      const updateCountdown = () => {
        const now = new Date().getTime();
        const timeDifference = targetTimestamp - now;

        if (timeDifference <= 0) {
          // Countdown is over, display confetti if not already displayed
          setIsConfettiActive(true);
          setHasDisplayedConfetti(true);
        }
      };

      const countdownInterval = setInterval(updateCountdown, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [upcomingLaunchesToShow, hasDisplayedConfetti]);

  useEffect(() => {
    if (isConfettiActive) {
      // Play the confetti animation for 5 seconds and then reset the state
      const confettiTimeout = setTimeout(() => {
        setIsConfettiActive(false);
      }, 5000);

      return () => {
        clearTimeout(confettiTimeout);
      };
    }
  }, [isConfettiActive]);

  if (isLoading) {
    // Show "Loading..." message while waiting for the data to be fetched
    return (
      <>
        <img className={`background-img2`} src="/bg-img.jpg" />
        <div className="main-launch">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <img className={`background-img2`} src="/bg-img.jpg" />
      {upcomingLaunchesToShow ? (
        upcomingLaunchesToShow.map((launch, index) => (
          <div
            key={launch.id}
            className={index === 0 ? "main-launch" : "other-launch"} // Use hero2 for the first launch, hero3 for the rest
            data-index={index}
            style={
              index === 1
                ? { backgroundColor: "#0a0a0a", padding: "10px" }
                : null
            }
          >
            {index === 0 && <h2>UPCOMING LAUNCH</h2>}
            <div className="upcoming-cont">
              <img
                src={
                  !launch.mission_patches[0]
                    ? launch.image
                    : launch.mission_patches[0].image_url
                }
                alt={launch.name}
                className={index === 0 ? "main-launch-img" : "other-launch-img"}
              />
              <div className="upcoming">
                <div className="title-status-cont">
                  <div className="title-cont">
                    <div className="title">
                      {launch.name}
                      <span className="agency">
                        - {launch.launch_service_provider.name}
                      </span>
                    </div>
                    <div className="launchpad">
                      {launch.pad.location.name} - {launch.pad.name}
                    </div>
                  </div>
                  <Tooltip
                    id={launch.id}
                    content={launch.status.name}
                    variant="info"
                  />
                  <div data-tooltip-id={launch.id} className="status">
                    {launch.status.abbrev}
                  </div>
                </div>
                <div className="mission_info">
                  {launch.mission.description}
                  <div className="orbit-Type-cont">
                    <span
                      data-tooltip-id={`orbit-Type-${launch.id}`}
                      className="orbit-Type"
                    >
                      {launch.mission.orbit.abbrev}
                    </span>
                    <span className="orbit-Type">{launch.mission.type}</span>
                  </div>
                  <Tooltip
                    id={`orbit-Type-${launch.id}`}
                    content={launch.mission.orbit.name}
                    variant="info"
                  />
                </div>
                <div className="countdown">
                  <Countdown targetTimestamp={launch.net} />
                  {index === 0 && (
                    <TitleCountDown targetTimestamp={launch.net} />
                  )}
                </div>
                <div className="countdown-precision">
                  <span className="net-precision">
                    {launch.net_precision.description}
                  </span>
                </div>
                <div className="socials">
                  <Link href="https://www.youtube.com/spacex" target="_blank">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 576 512"
                      data-tooltip-id="youtube"
                    >
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                    </svg>
                  </Link>
                  <Link href="https://twitter.com/spacex" target="_blank">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                      data-tooltip-id="twitter"
                    >
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://www.instagram.com/spacex/"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                      data-tooltip-id="insta"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </Link>
                  <Tooltip
                    id="youtube"
                    content="YouTube Channel"
                    variant="info"
                  />
                  <Tooltip
                    id="twitter"
                    content="Twitter Profile"
                    variant="info"
                  />
                  <Tooltip
                    id="insta"
                    content="Instagram Profile"
                    variant="info"
                  />
                </div>
              </div>
            </div>
            {index === 1 && (
              <div className="seperator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
        ))
      ) : (
        <>
          <img className={`background-img2`} src="/bg-img.jpg" />
          <div className="loading">
            <h1>Loading...</h1>
          </div>
        </>
      )}
      {isConfettiActive && (
        <Confetti
          recycle={false}
          numberOfPieces={1000}
          onConfettiComplete={() => setIsConfettiActive(false)}
        />
      )}
    </>
  );
}

export default Launches;
