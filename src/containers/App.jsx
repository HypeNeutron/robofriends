import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import SearchBox from "../components/SearchBox";
import ScrollWrapper from "../components/ScrollWrapper/ScrollWrapper";
import "./App.css";

export default function App() {
  const [dataRobots, setDataRobots] = useState({
    robots: [],
    searchField: "",
  });

  const { robots, searchField } = dataRobots;

  const API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    axios(API_ENDPOINT).then((users) => {
      setDataRobots((prev) => ({ ...prev, robots: users.data }));
    });
  }, []);

  const onSearchChange = ({ target }) => {
    setDataRobots((prev) => ({ ...prev, searchField: target.value }));
  };

  const filterRobotsCardByName = robots.filter((robot) => {
    const { name } = robot;
    return name.match(new RegExp(`^${searchField}`, "i")); //dynamic regex
  });

  const searchLength = filterRobotsCardByName.length;

  return !robots ? (
    <h1 className="tc">Loading....</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <ScrollWrapper>
        {!searchLength && (
          <div className="empty-container">
            <h2 className="tc">Do Not Match Any Searching</h2>
          </div>
        )}
        <Card robots={filterRobotsCardByName} />
      </ScrollWrapper>
    </div>
  );
}
