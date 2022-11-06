import React from "react";

const Notification = ({ message }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  let notification = null;

  if (message) {
    notification = <div style={style}>{message}</div>;
  }

  return notification;
};

export default Notification;
