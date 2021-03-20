import React, { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { SearchBox } from "../components/SearchBox";
import { Scroll } from "../components/Scroll";
import "./App.css";

export default function App() {
  const [dataSearch, setDataSearch] = useState({
    robots: [],
    searchField: "",
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        setDataSearch((prev) => ({ ...prev, robots: users }));
      });
    // return () => {}; //Cleanup
  }, []);

  function onSearchChange({ target }) {
    setDataSearch((prev) => ({ ...prev, searchField: target.value }));
  }

  const searchTyping = dataSearch.searchField;

  const filterRobotsCardByName = dataSearch.robots.filter((robots) => {
    const robotsName = robots.name;
    return robotsName.match(new RegExp(`^${searchTyping}`, "i")); //dynamic regex
  });

  return !dataSearch.robots ? (
    <h1 className="tc">Loading....</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <Card robots={filterRobotsCardByName} />
      </Scroll>
    </div>
  );
}
