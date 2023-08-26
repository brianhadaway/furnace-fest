import React from "react";
import { css } from "@emotion/css";
import { Link, Outlet, useParams } from "react-router-dom";
import { DAYS } from "../App";
import texture from '../assets/wrinkle.png';

const scheduleStyles = css`
  background-color: var(--theme-color);
  background-image: url(${texture});
  background-size: cover;
  padding: 8px;

  .day-nav {
    background: #222;
    padding: 5px 0;
    position: sticky;
    top: 0;
    z-index: 10;

    a {
      margin: 0 5px;
      padding: 0 5px;
      text-decoration: none;

      &.day-active {
        background-color: black;
        font-weight: bold;
        border-bottom: 5px solid black;
      }

      &:hover:not(.day-active) {
        background-color: black;
      }
    }
  }
`;

//@TODO
//Firebase integration (schedule api, auth, user schedules)

export default function Schedule() {
  const { day } = useParams();
  const tabClass = (d) => (d === day ? "day-active" : "");

  return (
    <div className={`schedule ${scheduleStyles}`}>
      <div className="day-nav">
        {Object.keys(DAYS).map((day) => {
          return (
            <Link
              to={`/schedule/${DAYS[day]}`}
              key={DAYS[day]}
              className={`${tabClass(DAYS[day])} date-pill`}
            >
              {DAYS[day]}
            </Link>
          );
        })}
      </div>

      <Outlet />
    </div>
  );
}
