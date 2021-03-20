import React from "react";
import "./scroll.css";
export const Scroll = ({ children }) => {
  try {
    return <div className="scrolls">{children}</div>;
  } catch (error) {
    throw new Error("NO");
  }
};
