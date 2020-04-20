import React from "react";

const Notification = ({ notification }) => {
  const { text, type } = notification;
  const notificationStyle = {
    backgroundColor: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  };

  const successStyles = {
    ...notificationStyle,
    color: "green"
  };

  const errorStyles = {
    ...notificationStyle,
    color: "red"
  };

  if (text === null) {
    return null;
  }

  return (
    <div style={type === "success" ? successStyles : errorStyles}>{text}</div>
  );
};

export default Notification;
