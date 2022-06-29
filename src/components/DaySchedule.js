import React from "react";
import { useParams } from "react-router-dom";
import { css } from "@emotion/css";

//@TODO - fetch schedule here using the :day param

const scheduleStyles = css`
  .grid-container {
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      column-gap: 10px;
      display: grid;
      grid-template-columns: repeat(3, 1fr); //3 locations
      grid-template-rows: repeat(
        144,
        10px
      ); //12 hours consisting of 12 5-minute blocks
      margin: 0 auto;
      row-gap: 10px;
      width: 80%;
    }
    box-sizing: border-box;
    min-height: 100vh;
    padding: 10px;
    width: 100%;
  }

  .grid-item {
    --item-color: gray;

    border: 2px solid var(--item-color);
    border-radius: 6px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: end;
    margin-bottom: 10px;
    padding: 10px;
    text-align: left;
    transition: all 200ms ease-in;

    @media (min-width: 768px) {
      margin-bottom: 0;
    }

    &:hover {
      background-color: var(--item-color);
      color: black;
    }

    &.stage-0 {
      --item-color: #15aad4;
    }

    &.stage-1 {
      --item-color: #8e8e8e;
    }

    &.stage-2 {
      --item-color: magenta;
    }

    h3 {
      font-size: 0.8rem;
      margin: 0;
      text-transform: uppercase;
    }

    p {
      font-size: 0.6rem;
      margin: 0;
    }
  }

  header {
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: 4;
    grid-row-end: 2;
    background: red;
    position: sticky;
    top: 10px;
  }
`;

const hourZero = 12; //event starts at noon
const dayPart = 5; //day divided into 5 minute increments

const stageData = [
  {
    time: ["23 Sep 2022 12:50", "23 Sep 2022 13:20"],
    selected: false,
    name: "Show 1-1",
    stageId: 0,
    id: 1,
  },
  {
    time: ["23 Sep 2022 12:00", "23 Sep 2022 12:30"],
    selected: false,
    name: "Show 2-1",
    stageId: 1,
    id: 2,
  },
  {
    time: ["23 Sep 2022 12:35", "23 Sep 2022 13:05"],
    selected: false,
    name: "Show 2-2",
    stageId: 1,
    id: 3,
  },
  {
    time: ["23 Sep 2022 13:10", "23 Sep 2022 13:40"],
    selected: false,
    name: "Show 2-3",
    stageId: 1,
    id: 4,
  },
  {
    time: ["23 Sep 2022 12:00", "23 Sep 2022 12:45"],
    selected: false,
    name: "Show 3-1",
    stageId: 2,
    id: 5,
  },
  {
    time: ["23 Sep 2022 12:50", "23 Sep 2022 13:05"],
    selected: false,
    name: "Show 3-2",
    stageId: 2,
    id: 6,
  },
  {
    time: ["23 Sep 2022 13:10", "23 Sep 2022 13:40"],
    selected: false,
    name: "Show 3-3",
    stageId: 2,
    id: 7,
  },
];

stageData.sort((a, b) => new Date(a.time[0]) - new Date(b.time[0]));

function getGridPosition(time) {
  //parse start/end time to determine row-start and row-end
  return time.map((part) => {
    const parts = part
      .split(" ")[3]
      .split(":")
      .map((v) => parseFloat(v, 10));
    const position =
      (parts[0] - hourZero) * (60 / dayPart) + parts[1] / dayPart + 2;
    return position;
  });
}

export default function DaySchedule() {
  const { day } = useParams();
  return (
    <div className={scheduleStyles}>
      <div className="grid-container">
        {stageData.map((show) => {
          const [gridRowStart, gridRowEnd] = getGridPosition(show.time);
          return (
            <div
              className={`grid-item stage-${show.stageId}`}
              key={show.id}
              style={{
                gridColumnStart: show.stageId + 1,
                gridRowStart,
                gridRowEnd,
              }}
            >
              <h3>{show.name}</h3>
              <p>{show.time}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
