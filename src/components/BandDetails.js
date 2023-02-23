import React from "react";
import { css } from "@emotion/css";
import moment from "moment";
import { stages } from "../utils/constants";

const styles = css`
  background-color: black;
  color: var(--theme-color);
  margin: 0 8px 8px;
  padding: 25px 0;
  position: relative;
  z-index: 1;

  h2 {
    text-transform: uppercase;
    font-weight: 1000;
    margin-top: 0;
  }

  button {
    background: var(--theme-color);
    border: none;
    cursor: pointer;
    height: 40px;
    position: absolute;
    right: 5px;
    top: 5px;
    width: 40px;
  }
`;

export default function BandDetails({ band, handleOnClose }) {
  const [startTime, endTime] = band.time;
  return (
    <div className={styles}>
      <button type="button" onClick={handleOnClose}>
        <svg
          width="20"
          height="20"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.58 12 5 17.58 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </button>
      <h2>{band.name.split(",").reverse().join(" ")}</h2>
      <p>
        {/* {`Playing on ${band.dateDisplay} from ${moment(startTime).format(
          "LT"
        )} to
        ${moment(endTime).format("LT")} on the ${stages[band.stageId].name} (${
          stages[band.stageId].location
        })`} */}
        {`Playing on ${band.dateDisplay} (time and stage TBA)`}
      </p>
    </div>
  );
}
