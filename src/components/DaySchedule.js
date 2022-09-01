import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { css } from "@emotion/css";

//@TODO - fetch schedule here using the :day param
//@TODO - Filter by stage when mobile

const scheduleStyles = css`
  --border-radius: 6px;
  --stage0color: #15aad4;
  --stage1color: #3e3e3e;
  --stage2color: #dcdcdc;
  --stage0text: white;
  --stage1text: white;
  --stage2text: black;
  --column-gap: 40px;

  .grid-line {
    border-block: 1px dashed gray;
    color: gray;
    display: none;
    grid-column-start: 1;
    grid-column-end: 6;
    position: relative;
    text-align: left;
    z-index: 1;

    @media (min-width: 768px) {
      display: unset;
    }

    .time-text {
      display: block;
      font-size: 0.7rem;
      left: -50px;
      position: absolute;
      text-align: right;
      top: -0.4rem;
      width: 40px;
    }
  }

  .stage-header-grid {
    background: black;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
    padding: 10px;
    position: sticky;
    top: 33px; //day-nav height
    width: 100%;
    z-index: 10;

    .stage-header-grid-inner {
      column-gap: var(--column-gap);
      display: grid;
      grid-template-columns: 10px repeat(3, 1fr) 10px; //3 locations
      margin: 0 auto;
    }

    @media (min-width: 768px) {
      .stage-header-grid-inner {
        width: 80%;
      }
    }

    .stage-header {
      align-items: center;
      border-radius: var(--border-radius);
      cursor: pointer;
      display: flex;
      font-size: 14px;
      font-weight: bold;
      justify-content: center;
      opacity: 0.5;
      padding: 5px;
      text-align: center;
      text-transform: uppercase;

      &.stage-active {
        opacity: 1;
      }
    }

    .stage-0 {
      background: var(--stage0color);
      color: var(--stage0text);
      grid-column-start: 2;
    }

    .stage-1 {
      background: var(--stage1color);
      color: var(--stage1text);
      grid-column-start: 3;
    }

    .stage-2 {
      background: var(--stage2color);
      color: var(--stage2text);
      grid-column-start: 4;
    }
  }

  .grid-container {
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      column-gap: var(--column-gap);
      display: grid;
      grid-template-columns: 10px repeat(3, 1fr) 10px; //3 locations
      grid-template-rows: repeat(
        144,
        10px
      ); //12 hours consisting of 12 5-minute blocks
      margin: 0 auto;
      row-gap: 0;
      width: 80%;
    }
    min-height: 100vh;
    padding: 10px;
    width: 100%;
  }

  .grid-item {
    --item-color: gray;
    --text-color: white;
    background: var(--item-color);
    border-radius: var(--border-radius);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin-bottom: 10px;
    padding: 10px;
    text-align: left;
    transition: all 200ms ease-in;
    z-index: 5;

    @media (min-width: 768px) {
      margin-bottom: 0;
    }

    &.stage-0 {
      --item-color: var(--stage0color);
      --text-color: var(--stage0text);
    }

    &.stage-1 {
      --item-color: var(--stage1color);
      --text-color: var(--stage1text);
    }

    &.stage-2 {
      --item-color: var(--stage2color);
      --text-color: var(--stage2text);
    }

    &.album-play {
      border-right: 6px solid #0058a3;
    }

    h3 {
      font-size: 0.8rem;
      font-weight: 900;
      margin: 0 0 2px;
      text-transform: uppercase;
    }

    p {
      font-size: 0.6rem;
      font-weight: 700;
      margin: 0 0 4px;
    }

    .album-play-pill {
      background: #0058a3;
      border-radius: 5px;
      color: white;
      font-size: 0.6rem;
      height: 20px;
      padding: 4px 6px;
      text-transform: uppercase;
      width: fit-content;
    }
  }
`;

const hourZero = 12; //event starts at noon
const dayPart = 5; //day divided into 5 minute increments

function getGridPosition(time) {
  //parse start/end time to determine row-start and row-end
  return time.map((part) => {
    const parts = part
      .split(" ")[1]
      .split(":")
      .map((v) => parseFloat(v, 10));
    const position =
      (parts[0] - hourZero) * (60 / dayPart) + parts[1] / dayPart + 2;
    return position;
  });
}

function getParsedTime(time) {
  return time.map((part) =>
    new Date(part).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })
  );
}

export default function DaySchedule({ bandsByDay }) {
  const { day } = useParams();
  const hours = [
    "12:00",
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
  ];

  const stages = [
    "Baked Brothers Stage",
    "Plug Your Holes Stage",
    "Wheelhouse Stage",
  ];

  const [stageFilter, setStageFilter] = useState(
    stages.reduce((acc, stage, i) => {
      return {
        ...acc,
        [i]: true,
      };
    }, {})
  );

  return (
    <div className={scheduleStyles}>
      <div className="stage-header-grid">
        <div className="stage-header-grid-inner">
          {stages.map((stage, i) => {
            return (
              <div
                key={`stage-${i}`}
                className={`stage-header stage-${i} ${
                  stageFilter[i] ? "stage-active" : ""
                }`}
                onClick={() =>
                  setStageFilter({ ...stageFilter, [i]: !stageFilter[i] })
                }
              >
                {stage}
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid-container">
        {hours.map((hour, i) => {
          const gridRowStart = i * 12 + 2;
          const gridRowEnd = gridRowStart + 6;
          return (
            <div
              className="grid-line"
              key={hour}
              style={{ gridRowStart, gridRowEnd }}
            >
              <div className="time-text">{hour}</div>
            </div>
          );
        })}
        {bandsByDay[day].map((show) => {
          if (!stageFilter[show.stageId]) {
            return;
          }
          const [gridRowStart, gridRowEnd] = getGridPosition(show.time);
          const parsedTime = getParsedTime(show.time);
          return (
            <div
              className={`grid-item stage-${show.stageId} ${
                show.albumPlay ? "album-play" : ""
              }`}
              key={show.id}
              style={{
                gridColumnStart: show.stageId + 2,
                gridRowStart,
                gridRowEnd,
              }}
            >
              <h3>{show.name.split(",").reverse().join(" ")}</h3>
              <p>
                {parsedTime[0]} - {parsedTime[1]}
              </p>
              {show.albumPlay && (
                <div className="album-play-pill">Album Play</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
