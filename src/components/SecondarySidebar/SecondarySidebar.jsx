import React from "react";
import "./SecondarySidebar.scss";

export const SecondarySidebar = ({ titlePage, items }) => {
  return (
    <div className="secondary-sidebar">
      <h3 className="title-page">{titlePage}</h3>
      <div className="item-group">
        {items.map((item) => {
          return (
            <button
              key={item.label}
              className={
                item.active ? "button-sidebar active" : "button-sidebar"
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
