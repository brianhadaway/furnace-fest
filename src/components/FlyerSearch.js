import React, { useState, useRef } from "react";
import mixpanel from "mixpanel-browser";
import {css} from '@emotion/css';

import Search from "./Search";
import BandList from "./BandList";
import BandDetails from "./BandDetails";
import texture from '../assets/wrinkle.png';

const styles = css`
  background-color: var(--theme-color);
  background-image: url(${texture});
  background-size: cover;
  margin: 0 auto;
  max-width: 1024px;
  padding: 0 0 16px;
  position: relative;
`

export default function FlyerSearch({ bands, bandsByDay }) {
  const [selectedBands, setSelectedBands] = useState({});
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [detailBand, setDetailBand] = useState(null);

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    const bandState = results.reduce((acc, band) => {
      acc[band.id] = true;
      return acc;
    }, {});

    mixpanel.track('Search', {'input': string});

    setSelectedBands(bandState);
  };

  const handleOnSelect = (band) => {
    mixpanel.track('Search Select', {'input': band.name});
    setSelectedBands({
      [band.id]: true,
    });
    setDetailsVisible(true);
    setDetailBand(band);
  };

  const handleOnClear = () => {
    setDetailsVisible(false);
  };

  const headerRef = useRef(null);

  return (
    <div className={styles}>
      <header ref={headerRef}>
        <div className="header-inner">
          <div className="skewed-header skewed-header-secondary">
            <h2 className="skewed-header-content">Sloss Furnaces<br/>Birmingham, AL</h2>
          </div>
          <div className="skewed-header">
            <h1>Furnace Fest<br/>SEP 22-24 2023</h1>
          </div>
          <div className="skewed-header skewed-header-tertiary">
            <h2 className="skewed-header-content">Tickets & More<br/>FurnaceFest.us</h2>
          </div>
        </div>
        <Search
          items={bands}
          handleOnSearch={handleOnSearch}
          handleOnSelect={handleOnSelect}
          handleOnClear={handleOnClear}
        />
      </header>
      <BandDetails
          band={detailBand}
          headerRef={headerRef.current}
          handleOnClose={() => setDetailsVisible(false)}
          visible={detailsVisible}
        />
      <BandList
        bands={bandsByDay}
        selectedBands={selectedBands}
        onClick={handleOnSelect}
      />
    </div>
  );
}
