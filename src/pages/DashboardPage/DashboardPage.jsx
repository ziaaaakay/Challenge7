import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardNavbar } from "../../components/DashboardNavbar/DashboardNavbar";
import { SideNavbar } from "../../components/SideNavbar/SideNavbar";
import { CarPage } from "./CarPage/CarPage";
import HouseIcon from "../../assets/img/fi_home.svg";
import TruckIcon from "../../assets/img/fi_truck.svg";
import "./DashboardPage.scss";
import { DashboardMainPage } from "./DashboardMainPage/DashboardMainPage";

export const DashboardPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accountData") === null) {
      navigate("/login");
      return;
    }
    const accountData = JSON.parse(localStorage.getItem("accountData"));
    if (accountData.role !== "admin") {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="dashboard-page">
      <DashboardNavbar />
      <div className="main-content">
        {params.first === undefined ? <DashboardMainPage /> : null}
        {params.first === "car" ? <CarPage /> : null}
      </div>
      <SideNavbar
        items={[
          { icon: HouseIcon, text: "Dashboard", link: "/dashboard" },
          { icon: TruckIcon, text: "Cars", link: "/dashboard/car" },
        ]}
        activeItem={params.first === undefined ? 0 : 1}
      />
    </div>
  );
};
