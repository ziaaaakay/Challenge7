import { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { CardCarItem } from "../../components/CardCarItem/CardCarItem";
import CarSearchForm from "../../components/CarSearchForm/CarSearchForm";
import { getCarData } from "../../redux/actions/getDataActions";
import "./CarPage.scss";

const SearchCarPage = (props) => {
  useEffect(() => {
    props.getCarData();
  }, []);

  const filterCar = () => {
    const seat = props.searchCar.seat;
    const driverType = props.searchCar.driverType;

    // filter driver
    let carByTipe = [];
    if (driverType === "") {
      carByTipe = props.carData;
    } else {
      carByTipe = props.carData.filter((car) => {
        if (driverType === "0") {
          return !car.status;
        } else {
          return car.status;
        }
      });
    }

    // filter by penumpang
    let carByPenumpang = [];
    if (seat === "") {
      carByPenumpang = carByTipe;
    } else {
      carByPenumpang = carByTipe.filter((car) => {
        if (seat === "1") {
          return car.category?.toLowerCase() === "small";
        } else if (seat > 1 && seat < 4) {
          return car.category?.toLowerCase() === "medium";
        } else {
          return car.category?.toLowerCase() === "large";
        }
      });
    }

    return carByPenumpang;
  };

  return (
    <div className="car-page">
      <div className="banner"></div>
      <div className="content-container d-flex flex-column align-items-center">
        <CarSearchForm mode="edit" />
        <div className="car-list">
          {filterCar().map((car) => {
            return (
              <CardCarItem
                key={car.name + car.id}
                id={car.id}
                img={car.image}
                name={car.name}
                type={car.category}
                desc={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                }
                seat={4}
                gear={"Manual"}
                price={car.price}
                year={2022}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    carData: state.getDataReducers.carData,
    searchCar: state.searchCarReducers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCarData: () => {
      dispatch(getCarData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCarPage);
