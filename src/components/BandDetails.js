import React from "react";
import { css } from "@emotion/css";
import moment from "moment";
import { roughStyle, stages } from "../utils/constants";
import rough from '../assets/rough.png';
import texture from '../assets/wrinkle.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

const clampBuilder = ( minWidthPx, maxWidthPx, minFontSize, maxFontSize ) => {
  const root = document.querySelector( "html" );
  const pixelsPerRem = Number( getComputedStyle( root ).fontSize.slice( 0,-2 ) );

  const minWidth = minWidthPx / pixelsPerRem;
  const maxWidth = maxWidthPx / pixelsPerRem;

  const slope = ( maxFontSize - minFontSize ) / ( maxWidth - minWidth );
  const yAxisIntersection = -minWidth * slope + minFontSize

  return `clamp( ${ minFontSize }rem, ${ yAxisIntersection }rem + ${ slope * 100 }vw, ${ maxFontSize }rem )`;
}

const styles = (visible, bandImg, headerRef) => css`
  background-color: var(--theme-color);
  background-image: url(${texture});
  background-size: cover;
  color: var(--theme-color);
  height: calc(100vh - ${headerRef ? headerRef.offsetHeight : 0}px);
  max-height: -webkit-fill-available;

  left: 0;
  margin: 0 8px;
  max-width: 1024px;
  padding: 0;
  position: fixed;
  right: 0;
  transform: ${visible ? 'none' : 'translateY(-200vh)'};
  transition: all 300ms ease-in-out;
  z-index: 1;

  .bandImg {
    background-blend-mode: luminosity;
    background-color: var(--theme-color);
    background-image: url(${rough}), url(${bandImg});
    background-position: center;
    background-repeat: repeat, no-repeat;
    background-size: contain, contain;
    content: '';
    display: block;
    padding-bottom: 42.8%;
    width: 100%;
    position: relative;
    z-index: 10;
  }

  @media(min-width: 1056px){
    margin: 0 auto 8px;
  }

  .bandWrapper {
    height: 100%;
    position: relative;
    z-index: 10;
  }

  .bandMeta {
    ${roughStyle}
    padding: 0 2px;

    .bandMeta-details {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    p {
      font-size: 0.8rem;
      margin: 2px;
    }
  }

  h1 {
    font-size: ${clampBuilder(400,1024,3,8)};
    font-weight: 1000;
    left: 0;
    line-height: 0.75;
    margin: 0;
    padding: 2px;
    right: 0;
    text-transform: uppercase;
    top: 0;
  }

  button {
    color: var(--theme-color);
    background: #2e2e2e;
    border: 1px solid #2e2e2e;
    border-radius: 1rem;
    box-shadow: 0 0 5px black;
    cursor: pointer;
    font-size: 2rem;
    width: 2rem;
    height: 2rem;
    padding: 0;
    position: absolute;
    top: 2px;
    right: 10px;
    z-index: 1;
  }
`;

export default function BandDetails({ band, handleOnClose, visible, headerRef }) {
  let bandImg = "";
  if(visible){
    const [startTime, endTime] = band.time;
    bandImg = band.bandImg;
  } 
  
  return (
    <div className={styles(visible, bandImg, headerRef)}>
      {visible && <div className="bandWrapper">
        <button type="button" onClick={handleOnClose}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <div className="bandMeta">
          <h1>{band.name.split(",").reverse().join(" ")}</h1>
          <div className="bandImg"></div>
          <div className="bandMeta-details">
            <p>
              {/* {`Playing on ${band.dateDisplay} from ${moment(startTime).format(
                "LT"
              )} to
              ${moment(endTime).format("LT")} on the ${stages[band.stageId].name} (${
                stages[band.stageId].location
              })`} */}
              {`Playing on ${band.dateDisplay}`}
            </p>
            {band.spotifyLink && <p><a href={band.spotifyLink} target="_blank"><FontAwesomeIcon icon={faMusic} /> Listen</a></p>}
          </div>
        </div>
      </div>}
    </div>
  );
}
