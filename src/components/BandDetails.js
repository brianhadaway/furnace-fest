import React from "react";
import { css } from "@emotion/css";

const styles = css`
  background-color: #15aad4;
  color: white;
  padding-block: 25px;
  position: relative;
  z-index: 1;

  h2 {
    text-transform: uppercase;
    font-weight: 1000;
    margin-top: 0;
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    height: 50px;
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
  }
`;

export default function BandDetails({ band, handleOnClose }) {
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
        Playing on {band.dateDisplay} at {band.time} on stage {band.stageId}
      </p>
      <p>More info coming soon.</p>
    </div>
  );
}
