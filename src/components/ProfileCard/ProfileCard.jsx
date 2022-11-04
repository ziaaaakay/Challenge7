import React from "react";
import "./ProfileCard.scss";
import { ReactComponent as ArrowDownIcon } from "../../assets/img/fi_arrow-down.svg";
import { Dropdown } from "react-bootstrap";

export const ProfileCard = ({ profileImg, name, handleLogout }) => {
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={profileImg} alt="Profile" />
      </div>
      <span className="profile-name">{name}</span>
      <Dropdown className="d-inline mx-2" autoClose="outside">
        <Dropdown.Toggle id="dropdown-autoclose-outside"></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
