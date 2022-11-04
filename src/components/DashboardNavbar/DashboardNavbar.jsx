import React from "react";
import "./DashboardNavbar.scss";
import { Navbar } from "react-bootstrap";
import { SearchBar } from "../SearchBar/SearchBar";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import { ReactComponent as HamburgerIcon } from "../../assets/img/fi_menu.svg";
import { useNavigate } from "react-router-dom";

export const DashboardNavbar = () => {
  const accountData = JSON.parse(localStorage.getItem("accountData"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accountData");
    localStorage.removeItem("accessToken");

    navigate("/login");
  };

  return (
    <Navbar fixed="top" className="dashboard-nav" expand="false">
      <div className="left-side">
        <Navbar.Brand href="/dashboard"></Navbar.Brand>
        <button className="menu-button">
          <HamburgerIcon />
        </button>
      </div>
      <div className="right-side">
        <SearchBar />
        <ProfileCard
          profileImg={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png"
          }
          name={accountData === null ? "" : accountData.email}
          handleLogout={handleLogout}
        />
      </div>
    </Navbar>
  );
};
