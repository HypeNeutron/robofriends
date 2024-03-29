import React from "react";

export default function SearchBox({ searchChange }) {
  return (
    <div className="pb3">
      <input
        className="pa3 ba b--green bg-lightest-blue"
        type="search"
        placeholder="search robots"
        onChange={searchChange}
      />
    </div>
  );
}
