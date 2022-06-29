import React from "react";
import { css } from "@emotion/css";
import { Link, Outlet, useParams } from "react-router-dom";

const scheduleStyles = css`
  padding: 10px;

  .day-nav {
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
//Day Nav - done (unstyled)
//Filter by Stage
//Search
//schedule conflicts (done in stackblitz)
//Save schedule to localStorage
//Firebase integration (schedule api, auth, user schedules)

const DAYS = Object.freeze({
  FRI: "friday",
  SAT: "saturday",
  SUN: "sunday",
});

export default function Schedule() {
  const { day } = useParams();
  const tabClass = (d) => (d === day ? "day-active" : "");

  return (
    <div className={`schedule ${scheduleStyles}`}>
      <div className="day-nav">
        {Object.keys(DAYS).map((day) => {
          return (
            <Link
              to={`/furnace-fest/schedule/${DAYS[day]}`}
              key={DAYS.FRI}
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
