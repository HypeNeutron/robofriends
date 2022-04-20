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
  const [online, setOnline] = useState(true);
  const [loading, setLoading] = useState(true);
  const { robots, searchField } = dataRobots;

  const API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios(API_ENDPOINT);
      if (!res.status === 200) {
        throw new Error(res.status);
      }
      setDataRobots((prev) => ({ ...prev, robots: res.data }));
      setOnline(true);
      setLoading(false);
    } catch (err) {
      if (err.toString().includes("Network Error")) {
        setOnline(false);
      } else {
        throw new Error(err);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSearchChange = ({ target }) => {
    setDataRobots((prev) => ({ ...prev, searchField: target.value }));
  };

  if (!online) {
    const reFetch = setInterval(() => {
      fetchUsers();
    }, 10000);
    if (online) {
      clearInterval(reFetch);
    }
  }

  const filterRobotsCardByName = robots.filter((robot) => {
    const { name } = robot;
    return name.match(new RegExp(`^${searchField}`, "i")); //dynamic regex
  });

  const searchLength = filterRobotsCardByName.length;
  return loading ? (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <ScrollWrapper>
        <h1 className="f1 pa7">Loading...</h1>
      </ScrollWrapper>
    </div>
  ) : !robots ? (
    <div className="tc">
      <h1 className="f1 ">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <ScrollWrapper>
        <h1 className="f1 pa7">something has wrong place contact Author</h1>
      </ScrollWrapper>
    </div>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <ScrollWrapper>
        {!online && (
          <div className="empty-container">
            <h2 className="tc">
              You are offline..Please check your internet connection.
            </h2>
          </div>
        )}
        {!searchLength && online && (
          <div className="empty-container">
            <h2 className="tc">Do Not Match Any Searching</h2>
          </div>
        )}
        <Card robots={filterRobotsCardByName} />
      </ScrollWrapper>
    </div>
  );
}
