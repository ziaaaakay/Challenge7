import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./PopularCar.scss";
import { faker } from "@faker-js/faker";

export const PopularCar = () => {
  const carList = ["BMW", "Audi", "Mercedes", "Toyota", "Honda"];

  const data = {
    labels: carList,
    datasets: [
      {
        label: "Total Sales",
        data: carList.map((car) =>
          faker.datatype.number({ min: 10, max: 100 })
        ),
        backgroundColor: "#0D28A6",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div id="popular-car">
      <div className="container row flex-column gap-5 justify-content-center align-items-center m-auto flex-lg-row">
        <h3 className="text-center text-uppercase text-500">Popular Car</h3>
        <div className="data-container">
          <Bar data={data} height={150} />
        </div>
      </div>
    </div>
  );
};
