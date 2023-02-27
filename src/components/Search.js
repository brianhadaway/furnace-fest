import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import PropTypes from "prop-types";
import { css } from "@emotion/css";

const styles = css`
  margin: 20px auto;
  width: 360px;
  z-index: 10;

  @media (min-width: 440px) {
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
        placeholder="SEARCH LINEUP"
        //autoFocus
        formatResult={formatResult}
        fuseOptions={{ threshold: 0.3 }}
        styling={{
          height: "34px",
          border: "1px solid #2e2e2e",
          borderRadius: "0",
          backgroundColor: "var(--theme-color)",
          //boxShadow: "none",
          hoverBackgroundColor: "rgba(46,46,46,0.25)",
          color: "#2e2e2e",
          fontSize: ".75rem",
          fontFamily: "Roboto Flex",
          iconColor: "#2e2e2e",
          lineColor: "rgba(46,46,46,0.5)",
          placeholderColor: "rgba(46,46,46,0.5)",
          clearIconMargin: "3px 8px 0 0",
          textTransform: "uppercase",
          zIndex: 1000,
        }}
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
