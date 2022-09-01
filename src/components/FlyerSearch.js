import React, { useState } from "react";

import Search from "./Search";
import BandList from "./BandList";
import BandDetails from "./BandDetails";

export default function FlyerSearch({ bands, bandsByDay }) {
  const [selectedBands, setSelectedBands] = useState({});
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [detailBand, setDetailBand] = useState(null);

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
    const bandState = results.reduce((acc, band) => {
      acc[band.id] = true;
      return acc;
    }, {});

    setSelectedBands(bandState);
  };

  const handleOnSelect = (band) => {
    console.log(band);
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
    <div>
      <header>
        <h5>the unofficial</h5>
        <h1>Furnace Fest</h1>

        <h5>band search</h5>
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
