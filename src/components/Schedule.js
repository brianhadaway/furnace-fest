import React from "react";
import { css } from "@emotion/css";
import { Link, Outlet, useParams } from "react-router-dom";
import { DAYS } from "../App";

const scheduleStyles = css`
  padding: 10px;

  .day-nav {
    background: #222;
    padding-block: 5px;
    position: sticky;
    top: 0;
    z-index: 10;

    a {
      margin-inline: 5px;
      text-decoration: none;

      &.day-active {
        background-color: #15aad4;
        font-weight: bold;
      }

      &:hover:not(.day-active) {
        background-color: white;
      }
    }
  }
`;

//@TODO
//schedule conflicts (done in stackblitz)
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
