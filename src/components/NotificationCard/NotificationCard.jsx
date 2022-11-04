import React from "react";
import "./NotificationCard.scss";

export const NotificationCard = ({text, type}) => {
  return <div className={"notification " + type}>
      <span>{text}</span>
  </div>;
};
