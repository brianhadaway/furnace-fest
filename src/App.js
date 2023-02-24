import React, {useEffect, useState} from "react";
import { css } from "@emotion/css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import moment from "moment";
import mixpanel from "mixpanel-browser";
import { roughStyle } from "./utils/constants";

import bands from "./data/bands.json";
import "./App.css";

import FlyerSearch from "./components/FlyerSearch";
import Schedule from "./components/Schedule";
import DaySchedule from "./components/DaySchedule";

import texture from './assets/wrinkle.png';

const navEnabled = false;

export const DAYS = Object.freeze({
  FRI: "friday",
  SAT: "saturday",
  SUN: "sunday",
});

const MIXPANEL_TOKEN = "3faf17b2a8fcd5797d67112ca865714e";

const THEME_COLORS = ["#aecd81", "#e99b60", "#dba1be", "#c4c4c4", "#e9dd69", "#a6d0cf"];
const COLOR_INDEX = Math.floor(Math.random() * THEME_COLORS.length);


const styles = css`
  --theme-color: ${THEME_COLORS[COLOR_INDEX]};

  * {
    box-sizing: border-box;
  }

  header {
    background-color: var(--theme-color);
    background-image: url(${texture});
    background-size: cover;
    border-bottom: 8px solid #2e2e2e;
    padding-top: 8px;
    position: sticky;
    top: 0;
    z-index: 10;

    .header-inner {
      align-items: center; 
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 0 16px;

      @media (min-width: 720px) {
        flex-direction: row;
      }
    }

    .skewed-header {
      ${roughStyle}
      color: var(--theme-color);
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      transform: skew(1deg, 2deg);

      h1 {
        font-size: 1.5rem;
        font-variation-settings: 'wght' 700, 'wdth' 90, 'slnt' 0;
        line-height: 1;
        margin: 0;
        text-transform: uppercase;
        transform: skew(-1deg, -2deg);
      }

      &.skewed-header-secondary,
      &.skewed-header-tertiary {
        font-variation-settings: 'wght' 500, 'wdth' 100, 'slnt' 0;
        padding: 10px;
        text-transform: uppercase;
        h2 {
          font-size: 0.8rem;
          margin: 0;
        }
      }

      &.skewed-header-secondary {
        transform: skew(0deg, 2deg) rotate(-5deg);

        .skewed-header-content {
          transform: skew(0deg, -2deg);
        }
      }

      &.skewed-header-tertiary {
        transform: skew(0deg, 2deg);

        .skewed-header-content {
          transform: none;
        }
      }
    }
  }

  
  h5 {
    margin: 0;
  }

  .site-nav {
    background: black;
    border-bottom: 8px solid black;
    color: black;
    padding: 10px;

    a {
      font-weight: bold;
      text-decoration: none;
    }
  }

  .date-pill {
    ${roughStyle}
    color: var(--theme-color);
    font-weight: 700;
    height: 32px;
    line-height: 32px;
    text-transform: uppercase;
  }

  footer {
    align-items: center;
    color: var(--theme-color);
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
    color: var(--theme-color);
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

        {!isInIframe && navEnabled && (
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
          ©2023 <a href="mailto:brianhadaway@gmail.com">Brian Hadaway</a>
        </div>
        <a href="https://instagram.com/furnacefest">@FurnaceFest</a>
      </footer>
    </div>
  );
}
