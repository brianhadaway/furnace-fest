import React, { useState } from 'react';
import {css} from '@emotion/css';

import bands from './data/bands.json';
import './App.css';
import Search from './components/Search';
import BandList from './components/BandList';
import BandDetails from './components/BandDetails';

const styles  = css`

.date-pill {
  background: #8e8e8e;
  border-radius: 1rem;
  color: #181818;
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 8px;
  text-transform: uppercase;
}

footer {
  align-items: center;
  background-color: black;
  color: #8e8e8e;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-inline: auto;
  max-width: 1024px;
  padding-block: 30px;

  @media (min-width: 720px) {
    flex-direction: row;
  }
}

a {
  color: #8e8e8e;
}
`;

const bandsByDay = bands.reduce((acc, band) => {
  const { date, tier } = band;

  if (typeof acc[date] === 'undefined') {
    acc[date] = {};
  }

  if (typeof acc[date][tier] === 'undefined') {
    acc[date][tier] = [];
  }

  acc[date][tier].push(band);

  return acc;
}, {});

export default function App() {
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
    <div className={styles}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,400;8..144,700;8..144,1000&display=swap" rel="stylesheet"></link>
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
      <BandList bands={bandsByDay} selectedBands={selectedBands} onClick={handleOnSelect} />
      <footer>
        <a href="https://www.furnacefest.us/">
          FurnaceFest.us
        </a>
        <div>
          Built for the Furnace Fest Community by{' '}
          <a href="mailto:brianhadaway@gmail.com">Brian Hadaway</a>
        </div>
        <a href="https://instagram.com/furnacefest">@FurnaceFest</a>
      </footer>
    </div>
  );
}