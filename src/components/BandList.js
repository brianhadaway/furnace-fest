import React from "react";
import { css } from "@emotion/css";
import { DAYS } from "../App";

const styles = css`
  align-items: center;
  background-color: #000000;
  color: #8e8e8e;
  display: flex;
  flex-direction: column;

  .day {
    background-color: #181818;
    max-width: 1024px;
    padding-top: 30px;
    width: 100%;

    @media (min-width: 720px) {
      width: auto;
    }
  }

  ul {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
    margin-left: 40px;
    margin-right: 40px;
    padding: 0;

    @media (min-width: 720px) {
      flex-direction: row;
      flex-wrap: wrap;

      &.tier-1 {
        flex-wrap: nowrap;
      }
    }

    &.tier-3 {
      border-bottom: 1px dashed #8e8e8e;
      padding-bottom: 40px;
    }
  }

  .band {
    cursor: pointer;
    padding: 5px;
    text-transform: uppercase;

    &.tier-1 {
      color: white;
      font-size: 2rem;
      font-weight: 1000;
      margin-left: 2rem;
      margin-right: 2rem;
    }

    &.tier-2 {
      font-size: 1.5rem;
      font-weight: 1000;
      padding: 5px 15px;
    }

    &.tier-3 {
      font-size: 1rem;
      padding: 5px 12px;
    }

    &.selected,
    &:hover {
      color: #15aad4;
    }
  }
`;

export default function BandList({ bands, selectedBands, onClick }) {
  const dates = [
    { key: DAYS.FRI, display: "Friday Sep 23" },
    { key: DAYS.SAT, display: "Saturday Sep 24" },
    { key: DAYS.SUN, display: "Sunday Sep 25" },
  ];
  const tiers = [1, 2, 3];
  return (
    <div className={styles}>
      {dates.map((date) => {
        return (
          <div className="day" key={date.key}>
            <div className="date-pill">{date.display}</div>
            {tiers.map((tier) => {
              return (
                <ul key={`${date.key}-${tier}`} className={`tier-${tier}`}>
                  {bands[date.key][tier].map((band) => {
                    const { id, name, stage, tier, time } = band;
                    return (
                      <li
                        key={id}
                        onClick={() => onClick(band)}
                        title={`${stage} stage @ ${time}`}
                        className={`band tier-${tier} ${
                          selectedBands[id] ? "selected" : ""
                        }`}
                      >
                        {name.split(",").reverse().join(" ")}
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
