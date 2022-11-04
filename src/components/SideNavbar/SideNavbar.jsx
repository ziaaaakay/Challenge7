import React from "react";
import "./SideNavbar.scss";
import { useNavigate } from "react-router-dom";

export const SideNavbar = ({ items, activeItem }) => {
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-image"></div>
      </div>
      {items.map((item, index) => {
        return (
          <SideNavbarItem
            key={`${item.text} ${index}`}
            icon={item.icon}
            text={item.text}
            link={item.link}
            active={activeItem === index}
          />
        );
      })}
    </div>
  );
};

const SideNavbarItem = ({ icon, text, active, link, handleClick }) => {
  let navigate = useNavigate();
  return (
    <button
      className={active ? "sidebar-item active" : "sidebar-item"}
      onClick={() => {
        navigate(link);
      }}
    >
      <img src={icon} alt={text} />
      <span className={"button-text"}>{text}</span>
    </button>
  );
};
