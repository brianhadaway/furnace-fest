import React, {useEffect, useState} from "react";
import { css } from "@emotion/css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import moment from "moment";
import mixpanel from "mixpanel-browser";

import bands from "./data/bands.json";
import "./App.css";

import FlyerSearch from "./components/FlyerSearch";
import Schedule from "./components/Schedule";
import DaySchedule from "./components/DaySchedule";

export const DAYS = Object.freeze({
  FRI: "friday",
  SAT: "saturday",
  SUN: "sunday",
});

const MIXPANEL_TOKEN = "3faf17b2a8fcd5797d67112ca865714e";

const styles = css`
  * {
    box-sizing: border-box;
  }

  .site-nav {
    background: white;
    border-bottom: 8px solid #15aad4;
    color: black;
    padding: 10px;

    a {
      font-weight: bold;
      text-decoration: none;
    }
  }

  .date-pill {
    background: #8e8e8e;
    border-radius: 1rem;
    color: #181818;
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 4px 8px;
    text-transform: uppercase;
  }

  footer {
    align-items: center;
    background-color: #222;
    color: #8e8e8e;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    max-width: 1024px;
    padding: 30px 0;

    @media (min-width: 720px) {
      flex-direction: row;
    }
  }

  a {
    color: #8e8e8e;
  }
`;

const bandsByDayByTier = bands.reduce((acc, band) => {
  const { date, tier } = band;

  if (typeof acc[date] === "undefined") {
    acc[date] = {};
  }

  if (typeof acc[date][tier] === "undefined") {
    acc[date][tier] = [];
  }

  acc[date][tier].push(band);

  return acc;
}, {});

const bandsByDay = bands.reduce((acc, band) => {
  const { date } = band;

  if (typeof acc[date] === "undefined") {
    acc[date] = [];
  }

  acc[date].push(band);

  return acc;
}, {});

Object.keys(DAYS).map((day) => {
  return bandsByDay[DAYS[day]].sort(
    (a, b) => moment(a.time[0]).valueOf() - moment(b.time[0]).valueOf()
  );
});

mixpanel.init(MIXPANEL_TOKEN);

export default function App() {
  const isInIframe = window.self !== window.top;
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(() => {
    const {pathname} = location;
    mixpanel.track('Page Load', {pathname});
    return location.pathname;
  });

  useEffect(() => {
    const {pathname} = location;
    if(currentLocation !== pathname){
      setCurrentLocation(pathname);
      mixpanel.track('Page Load', {pathname});
    }
  }, [location, currentLocation])
  return (
    <div className={styles}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,400;8..144,700;8..144,1000&display=swap"
        rel="stylesheet"
      ></link>

        {!isInIframe && (
          <nav className="site-nav">
            <Link to="/">Home | </Link>
            <Link to="/schedule/friday">Schedule</Link>
          </nav>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <FlyerSearch bands={bands} bandsByDay={bandsByDayByTier} />
            }
          />
          <Route path="/schedule" element={<Schedule />}>
            <Route
              path=":day"
              element={<DaySchedule bandsByDay={bandsByDay} />}
            />
          </Route>
        </Routes>
      <footer>
        <a href="https://www.furnacefest.us/">FurnaceFest.us</a>
        <div>
          ©2022 <a href="mailto:brianhadaway@gmail.com">Brian Hadaway</a>
        </div>
        <a href="https://instagram.com/furnacefest">@FurnaceFest</a>
      </footer>
    </div>
  );
}
