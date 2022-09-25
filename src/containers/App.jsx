import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import Card from "../components/Card";
import SearchBox from "../components/SearchBox";
import ScrollWrapper from "../components/ScrollWrapper/ScrollWrapper";
import "./App.css";

export default function App() {
  const [dataRobots, setDataRobots] = useState({
    robots: [],
    searchField: "",
  });
  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState(true);
  const { robots, searchField } = dataRobots;

  const API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios(API_ENDPOINT);
      if (!res.status === 200) {
        throw new Error(res.status);
      }
      setDataRobots((prev) => ({ ...prev, robots: res.data }));
      setIsOnline(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.toString().includes("Network Error")) {
        setIsOnline(false);
      } else {
        throw new Error(err);
      }
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onSearchChange = ({ target }) => {
    setDataRobots((prev) => ({ ...prev, searchField: target.value }));
  };

  useEffect(() => {
    if (isOnline === true) return;
    const intervalId = setInterval(() => {
      fetchUsers();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchUsers, isOnline]);

  const filteredSearch = robots.filter((robot) => {
    const { name } = robot;
    return name.match(new RegExp(`^${searchField}`, "i")); //dynamic regex
  });

  const isMatch = filteredSearch.length;

  return (
    <div className="tc">
      <h1 className="f1 pv4">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <ScrollWrapper>
        {loading && <h1 className="f1 pa7">Loading...</h1>}
        {!robots && isOnline && (
          <h1 className="f1 pa7">something has wrong place contact Author</h1>
        )}
        {!isOnline && (
          <div className="empty-container">
            <h2 className="tc">
              You are offline..Please check your internet connection.
            </h2>
          </div>
        )}
        {!isMatch && isOnline && (
          <div className="empty-container">
            <h2 className="tc">Do Not Match Any Searching</h2>
          </div>
        )}
        <Card robots={filteredSearch} />
      </ScrollWrapper>
    </div>
  );
}
