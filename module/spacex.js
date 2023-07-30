"use client";
import "@css/spacex.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
function SpaceX() {
  const [spacexInfo, setSpacexInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (spacexInfo !== null) {
      console.log(spacexInfo);
    }
  }, [spacexInfo]);
  useEffect(() => {
    // Update the page title with the countdown values
    document.title = "LaunchHUB";
  }, []);

  useEffect(() => {
    const fetchUpcomingLaunches = async () => {
      try {
        const response = await axios.get("/api/fetchSpacex");
        const data = response.data; // Data is already the upcoming launch object
        setSpacexInfo(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching SpaceX Infos:", error);
      }
    };

    fetchUpcomingLaunches();
  }, []);

  function getTwoLetterCountryCode(countryCode) {
    const countryCodesMap = {
      USA: "US",
      // Add more country codes as needed
    };

    return countryCodesMap[countryCode] || countryCode;
  }
  return (
    <>
      {isLoading ? (
        <>
          <div className="loading">
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
      ) : (
        spacexInfo.map((spacex, index) => (
          <div className="spacex-cont" key={spacex.id}>
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="331.644px"
              height="40.825px"
              viewBox="0 0 331.644 40.825"
              enableBackground="new 0 0 331.644 40.825"
              xmlSpace="preserve"
              className="spacex-logo"
            >
              <g>
                <path d="M77.292,15.094H49.249l-1.039,0.777v24.947h7.763v-9.355l0.741-0.664h20.579   c5.196,0,7.632-1.398,7.632-4.985v-5.728C84.924,16.493,82.489,15.094,77.292,15.094 M77.292,24.317   c0,1.69-1.118,2.041-3.554,2.041H56.799l-0.827-0.804V20.21l0.741-0.678h17.025c2.436,0,3.554,0.347,3.554,2.045V24.317z" />
                <polyline points="99.081,19.813 105.761,29.6 105.391,30.548 90.618,30.548 86.847,35.187 108.837,35.187 110.361,36.115 113.775,40.824 122.659,40.824 103.186,14.775" />
                <polyline points="187.418,35.757 187.418,28.833 188.217,28.143 203.079,28.143 203.079,23.734 179.524,23.734 179.524,40.823 214.27,40.823 214.27,36.435 188.252,36.435" />
                <rect x="179.524" y="15.094" width="35.113" height="4.848" />
                <path d="M140.361,19.685h28.288c-0.436-3.597-2.668-4.595-8.33-4.595H140.06c-6.389,0-8.427,1.247-8.427,6.082   v13.565c0,4.84,2.038,6.087,8.427,6.087h20.259c5.745,0,7.945-1.079,8.095-4.81h-28.053l-0.832-0.783V20.209" />
                <path d="M29.333,25.118H8.754l-0.606-0.667v-4.402l0.603-0.466h27.742l0.379-0.927   c-0.945-2.431-3.392-3.565-7.936-3.565H9.665c-6.385,0-8.426,1.247-8.426,6.082v2.844c0,4.841,2.041,6.086,8.426,6.086h20.533   l0.645,0.566v4.602l-0.526,0.718H6.83v-0.022H0.678c0,0-0.704,0.353-0.677,0.518c0.525,3.382,2.829,4.34,8.345,4.34h20.987   c6.384,0,8.486-1.247,8.486-6.087v-3.543C37.819,26.363,35.717,25.118,29.333,25.118" />
                <path d="M236.725,14.988h-11.551l-0.627,1.193l12.828,9.351c2.43-1.407,5.074-2.833,7.95-4.24" />
                <path d="M247.075,32.603l11.275,8.222h11.692l0.484-1.089L253.69,27.413   C251.454,29.054,249.245,30.787,247.075,32.603" />
                <path d="M235.006,40.806h-10.451l-0.883-1.383C230.778,32.562,262.56,3.151,331.644,0   C331.644,0,273.658,1.956,235.006,40.806" />
              </g>
            </svg>
            <div className="spacex-socials">
              <Link href={spacex.info_url} target="_blank">
                <img
                  data-tooltip-id="website"
                  src={spacex.nation_url}
                  className="spacex-icon"
                />
              </Link>
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
              <Link href="https://www.instagram.com/spacex/" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  data-tooltip-id="insta"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </Link>
              <Tooltip id="website" content="Official Website" variant="info" />
              <Tooltip id="youtube" content="YouTube Channel" variant="info" />
              <Tooltip id="twitter" content="Twitter Profile" variant="info" />
              <Tooltip id="insta" content="Instagram Profile" variant="info" />
            </div>
            <div className="spacex-infos-cont">
              <p>{spacex.description}</p>
              <div className="tags">
                <img
                  className="tags-img"
                  src={`https://flagsapi.com/${getTwoLetterCountryCode(
                    spacex.country_code
                  )}/flat/64.png`}
                  alt={`Flag of ${spacex.country}`}
                />
                <span>{spacex.abbrev}</span>
                <span>{spacex.type}</span>
              </div>
              <div className="spacex-seperator"></div>
              <div className="spacex-infos">
                <span>{spacex.administrator}</span>
                <span>Founded: {spacex.founding_year}</span>
                <span>Successful launches: {spacex.successful_landings}</span>
                <span>Failed launches: {spacex.failed_launches}</span>
                <span>Pending launches:{spacex.pending_launches}</span>
              </div>
            </div>
            <div className="rockets-cont">
              {spacex.launcher_list.map((rocket, index) => (
                <div className="rocket-card" key={index}>
                  <img src={rocket.image_url} alt={rocket.full_name} />
                  <div className="rocket-title">
                    <h3>{rocket.full_name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}
export default SpaceX;
