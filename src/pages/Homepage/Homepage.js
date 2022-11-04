import React from "react";
import CarSearchForm from "../../components/CarSearchForm/CarSearchForm";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";
import { OurService } from "../../components/OurService/OurService";
import { PopularCar } from "../../components/PopularCar/PopularCar";
import { WhyUs } from "../../components/WhyUs/WhyUs";
import "./Homepage.scss";

export const Homepage = () => {
  return (
    <>
      <div className="home">
        <div className="section-1">
          <HeroBanner />
          <CarSearchForm />
        </div>
        <OurService />
        <WhyUs />
        <PopularCar />
      </div>
    </>
  );
};
