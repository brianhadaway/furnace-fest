import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import PropTypes from 'prop-types';
import {css} from "@emotion/css";

const styles = css`
  margin-block: 20px 50px;
  margin-inline: auto;
  width: 375px;
  z-index: 10;

  @media (min-width: 400px) {
    width: 400px;
  }
`;

export default function Search({
  items,
  handleOnSearch,
  handleOnSelect,
  handleOnClear,
}) {
  const handleOnHover = (result) => {
    //console.log(result);
  };

  const handleOnFocus = () => {
    //console.log('Focused');
  };

  const formatResult = (band) => {
    return (
      <>
        <div>
          {band.name} - {band.dateDisplay}
        </div>
      </>
    );
  };

  return (
    <div className={styles}>
      <ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onClear={handleOnClear}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        //autoFocus
        formatResult={formatResult}
        fuseOptions={{ threshold: 0.3 }}
      />
    </div>
  );
}

Search.defaultProps = {
  items: [],
};

Search.propTypes = {
  handleOnClear: PropTypes.func.isRequired,
  handleOnSearch: PropTypes.func.isRequired,
  handleOnSelect: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};