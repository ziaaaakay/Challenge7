import React, { Fragment } from "react";
import { CarList, OrderList } from "../../../components/PageList/PageList";
import { SecondarySidebar } from "../../../components/SecondarySidebar/SecondarySidebar";
import { SectionNavigation } from "../../../components/SectionNavigation/SectionNavigation";
import "./DashboardMainPage.scss";

export const DashboardMainPage = () => {
  return (
    <Fragment>
      <SecondarySidebar
        titlePage={"DASHBOARD"}
        items={[{ label: "Dashboard", active: true }]}
      />
      <div className="dashboard-main">
        <SectionNavigation
          sections={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Dashboard" },
          ]}
        />
        <h3 className="section-title">Dashboard</h3>
        <OrderList />
        <CarList />
      </div>
    </Fragment>
  );
};
