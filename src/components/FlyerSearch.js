import React, { useState } from "react";
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

  return (
    <div className={styles}>
      <header>
        <h5>the unofficial</h5>
        <h1>Furnace Fest</h1>

        <h5>lineup & schedule</h5>
        <Search
          items={bands}
          handleOnSearch={handleOnSearch}
          handleOnSelect={handleOnSelect}
          handleOnClear={handleOnClear}
        />
        {detailsVisible && (
          <BandDetails
            band={detailBand}
            handleOnClose={() => setDetailsVisible(false)}
          />
        )}
      </header>
      <BandList
        bands={bandsByDay}
        selectedBands={selectedBands}
        onClick={handleOnSelect}
      />
    </div>
  );
}
