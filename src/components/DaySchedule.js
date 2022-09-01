import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { css } from "@emotion/css";

const scheduleStyles = css`
  --border-radius: 6px;
  --stage0color: #15aad4;
  --stage1color: #3e3e3e;
  --stage2color: #dcdcdc;
  --stage0text: white;
  --stage1text: white;
  --stage2text: black;
  --column-gap: 40px;
  --album-play-color: dodgerblue;
  --user-color: orange;

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
    top: 32px; //day-nav height
    width: 100%;
    z-index: 10;

    .stage-header-grid-inner {
      column-gap: var(--column-gap);
      grid-template-columns: 10px repeat(3, 1fr) 10px; //3 locations
      margin: 0 auto;
    }

    @media (min-width: 768px) {
      .stage-header-grid-inner {
        display: grid;
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
      margin-bottom: 6px;
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
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px 16px 10px;
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
      border-right: 6px solid var(--album-play-color);
      padding-right: 10px;
    }

    &.user-selected {
      background: repeating-linear-gradient(
          45deg,
          rgba(0, 0, 0, 0.1) 0px,
          rgba(0, 0, 0, 0.1) 20px,
          var(--item-color) 20px,
          var(--item-color) 40px
        ),
        var(--item-color);
    }

    h3 {
      font-size: 0.75rem;
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
      background: var(--album-play-color);
      border-radius: 5px;
      color: white;
      font-size: 0.6rem;
      height: 20px;
      padding: 4px 6px;
      text-transform: uppercase;
      width: fit-content;
    }

    button {
      align-items: center;
      cursor: pointer;
      display: flex;
      font-size: 16px;
      font-weight: 900;
      height: 32px;
      justify-content: center;
      padding: 0;
      width: 32px;
    }
  }

  .userScheduleToggle {
    margin-block: 10px 0;
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
  return time.map((part) => {
    const d = new Date(part).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    return d.split(" ")[0];
  });
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

  const [showUserSchedule, setShowUserSchedule] = useState(false);

  useEffect(() => {
    localStorage.setItem("userSchedule", JSON.stringify(userSchedule));
  }, [userSchedule]);

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
        <button
          className="userScheduleToggle"
          onClick={() => setShowUserSchedule(!showUserSchedule)}
        >
          {showUserSchedule ? "Show All Bands" : "Show My Schedule"}
        </button>
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
          const isUserSelected = userSchedule[show.id];
          if (
            !stageFilter[show.stageId] ||
            (showUserSchedule && !isUserSelected)
          ) {
            return;
          }
          const [gridRowStart, gridRowEnd] = getGridPosition(show.time);
          const parsedTime = getParsedTime(show.time);
          const userScheduleClass = isUserSelected ? "user-selected" : "";
          const albumPlayClass = show.albumPlay ? "album-play" : "";
          return (
            <div
              className={`grid-item stage-${show.stageId} ${albumPlayClass} ${userScheduleClass}`}
              key={show.id}
              style={{
                gridColumnStart: show.stageId + 2,
                gridRowStart,
                gridRowEnd,
              }}
            >
              <div class="show-info-wrapper">
                <h3>{show.name.split(",").reverse().join(" ")}</h3>
                <p>
                  {parsedTime[0]} - {parsedTime[1]}
                </p>
                {show.albumPlay && (
                  <div className="album-play-pill">Album Play</div>
                )}
              </div>

              <button
                type="button"
                title={`${
                  isUserSelected ? "Remove from" : "Add to"
                } my schedule`}
                onClick={() => onUserItemChange(show.id)}
              >
                {isUserSelected ? "-" : "+"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
