import React, {useState, useEffect} from "react";
import { css } from "@emotion/css";
import { DAYS } from "../App";
import { roughStyle, stages } from "../utils/constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";

const styles = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 16px 16px;

  .day {
    max-width: 1024px;
    padding-top: 16px;
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
    margin-bottom: 0;
    margin-top: 0;
    padding: 0;

    &.tier-1 {
      margin-bottom: 4px;
      margin-top: 4px;
    }

    @media (min-width: 720px) {
      flex-direction: row;
      flex-wrap: wrap;

      &.tier-1 {
        flex-wrap: nowrap;
      }
    }

    &.tier-2 {
      ${roughStyle}
      margin-bottom: 16px;
      min-height: 56px;
    }
  }

  .band {
    ${roughStyle}
    background-clip: text;
    color: transparent;
    cursor: pointer;
    display: flex;
    padding: 5px;
    text-transform: uppercase;

    &.tier-1 {
      font-size: 3rem;
      letter-spacing: -0.05em;
      min-height: 3rem;
      line-height: 3rem;

      margin-left: 2rem;
      margin-right: 2rem;
      padding: 4px 8px;
    }

    &.tier-2 {
      color: var(--theme-color);
      font-size: 1.75rem;
      padding: 4px 12px;

      button.toggleUserSchedule {
        color: var(--theme-color);
      }
    }

    &.tier-3 {
      font-size: 1.25rem;
      font-variation-settings: 'wght' 850, 'wdth' 30, 'slnt' 0;
      letter-spacing: -0.04em;
      padding: 4px 12px;
    }

    &.userSelected {
      ${roughStyle}
      background-clip: border-box;
      color: var(--theme-color);

      button.toggleUserSchedule {
        color: var(--theme-color);
      }

      &.tier-2 {
        background-color: var(--theme-color);
        color: #2e2e2e;

        button.toggleUserSchedule {
          color: #2e2e2e;
        }
      }
    }
  }

  button.toggleUserSchedule {
    background: transparent;
    border: 0;
    color: #2e2e2e;
    font-size: 1rem;
    margin-left: 6px;
    padding: 0;
  }
`;

export default function BandList({ bands, selectedBands, onClick }) {
  const dates = [
    { key: DAYS.FRI, display: "Friday" },
    { key: DAYS.SAT, display: "Saturday" },
    { key: DAYS.SUN, display: "Sunday" },
  ];
  const tiers = [1, 2, 3];

  const [userSchedule, setUserSchedule] = useState(() => {
    const saved = localStorage.getItem("userSchedule");
    const initialValue = JSON.parse(saved);
    return initialValue || {};
  });

  const onUserItemChange = (id) => {
    setUserSchedule({
      ...userSchedule,
      [id]: !userSchedule[id],
    });
  };

  useEffect(() => {
    localStorage.setItem("userSchedule", JSON.stringify(userSchedule));
  }, [userSchedule]);

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
                    const isUserSelected = userSchedule[band.id];
                    const userSelectionClass = isUserSelected ? 'userSelected' : '';
                    const { id, name, stageId, tier, time } = band;
                    return (
                      <li
                        key={id}
                        onClick={() => onClick(band)}
                        // title={`${stages[stageId].location} Stage @ ${time}`}
                        className={`band tier-${tier} ${
                          selectedBands[id] ? "selected" : ""
                        } ${userSelectionClass}`}
                      >
                        {name.split(",").reverse().join(" ")}
                        <button
                          type="button"
                          className="toggleUserSchedule"
                          title={`${
                            isUserSelected ? "Remove from" : "Add to"
                          } my schedule`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onUserItemChange(band.id)
                          }}
                        >
                          {isUserSelected ? (
                            <FontAwesomeIcon icon={faCircleXmark} />
                          ) : (
                            <FontAwesomeIcon icon={faCirclePlus} />
                          )}
                        </button>
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
