import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./SearchBar.css";
import { Spinner } from "react-bootstrap";

const SearchBar = (props) => {
  return (
    <div className="search-bar">
      <form onSubmit={props.onSubmit} style={{ width: "97%" }}>
        <label htmlFor="search">
          <span className="visually-hidden">{props.placeholder}</span>
        </label>
        <input
          type="text"
          className="search-input w-100"
          id="search"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          autoComplete="off"
        />
      </form>
      {props.loading && (
        <div align="center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <button onClick={props.clearSearch}>
        <FontAwesomeIcon icon={faTimes} color={"grey"} />
      </button>
    </div>
  );
};

export default SearchBar;
