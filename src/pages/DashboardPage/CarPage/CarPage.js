import React, { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { DeleteCard } from "../../../components/DeleteCard/DeleteCard";
import { ListCarItem } from "../../../components/ListCarItem/ListCarItem";
import { SecondarySidebar } from "../../../components/SecondarySidebar/SecondarySidebar";
import { SectionNavigation } from "../../../components/SectionNavigation/SectionNavigation";
import { NotificationCard } from "../../../components/NotificationCard/NotificationCard";
import { ReactComponent as PlusIcon } from "../../../assets/img/fi_plus.svg";
import { AddNewCar } from "../../../components/AddNewCar/AddNewCar";
import "./CarPage.scss";

export const CarPage = () => {
  const [pageState, setPageState] = useState("list-car");
  const [deleteItem, setDeleteItem] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [notif, setNotif] = useState({ show: false, type: "", message: "" });
  const [carFilter, setCarFilter] = useState("all");
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    const axios = require("axios");
    axios.get(process.env.REACT_APP_API + "/admin/car").then((res) => {
      setCarData(res.data);
    });
  }, []);

  const handleCarFilter = (category) => {
    setCarFilter(category);
  };

  const getCarShowed = () => {
    switch (carFilter) {
      case "all":
        return carData;
      case "small":
        return carData.filter((value) => {
          return value.category?.toLowerCase() === "small";
        });
      case "medium":
        return carData.filter((value) => {
          return value.category?.toLowerCase() === "medium";
        });
      case "large":
        return carData.filter((value) => {
          return value.category?.toLowerCase() === "large";
        });
      default:
        break;
    }
  };

  const handleShowDeleteAlert = (id) => {
    setDeleteItemId(id);
    setDeleteItem(true);
  };

  const handleUnshowDeleteAlert = () => {
    setDeleteItemId(null);
    setDeleteItem(false);
  };

  const handleDeleteItem = (id) => {
    const axios = require("axios");
    axios
      .delete(process.env.REACT_APP_API + "/admin/car/" + id)
      .then((res) => {
        if (res.status === 200) {
          handleUnshowDeleteAlert();
          handleShowNotification("black", "Data Berhasil Dihapus");
          const newCarData = carData.filter((value) => {
            return value.id !== id;
          });
          setCarData(newCarData);
        }
      })
      .catch((err) => {
        handleShowNotification("black", "Data Gagal Dihapus");
      });
  };

  const handleAddNewCar = async (name, category, price, status, image) => {
    const axios = require("axios");
    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("status", status);
    formData.append("image", image);

    var config = {
      method: "post",
      url: process.env.REACT_APP_API + "/admin/car",
      data: formData,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setCarData([...carData, response.data]);
        handleToListCar();
        handleShowNotification("success", "Data Berhasil Ditambahkan");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleToAddnewCar = () => {
    setPageState("add-new-car");
  };

  const handleToListCar = () => {
    setPageState("list-car");
    setCarFilter("all");
  };

  const handleShowNotification = (type, message) => {
    setPageState("list-car");
    setNotif({
      show: true,
      type: type,
      message: message,
    });

    setTimeout(() => {
      setNotif({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <Fragment>
      <SecondarySidebar
        titlePage={"CARS"}
        items={[{ label: "List Car", active: true }]}
      />

      {/* LIST CAR */}
      {notif.show ? (
        <NotificationCard type={notif.type} text={notif.message} />
      ) : null}
      {pageState === "list-car" ? (
        <Fragment>
          {deleteItem ? (
            <DeleteCard
              onCancel={handleUnshowDeleteAlert}
              onAccept={() => handleDeleteItem(deleteItemId)}
            />
          ) : null}
          <div className="list-car-section">
            <SectionNavigation
              sections={[
                { name: "Cars", link: "/dashboard/car" },
                { name: "List Car" },
              ]}
            />
            <div className="group-1">
              <h3 className="section-title">List Car</h3>
              <Button variant="primary" onClick={handleToAddnewCar}>
                <PlusIcon />
                Add New Car
              </Button>
            </div>
            <div className="category-group">
              <Button
                variant="outline-primary"
                onClick={() => handleCarFilter("all")}
                active={carFilter === "all"}
              >
                All
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => handleCarFilter("small")}
                active={carFilter === "small"}
              >
                Small
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => handleCarFilter("medium")}
                active={carFilter === "medium"}
              >
                Medium
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => handleCarFilter("large")}
                active={carFilter === "large"}
              >
                Large
              </Button>
            </div>
            <div className="list-car-group">
              {getCarShowed().map((item) => {
                return (
                  <ListCarItem
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    type={item.category}
                    price={item.price}
                    start={item.start_rent_at}
                    finish={item.finish_rent_at}
                    lastUpdate={item.updatedAt}
                    onDelete={() => handleShowDeleteAlert(item.id)}
                    onEdit={handleToAddnewCar}
                  />
                );
              })}
            </div>
          </div>
        </Fragment>
      ) : null}

      {/* ADD NEW CAR */}
      {pageState === "add-new-car" ? (
        <AddNewCar onCancel={handleToListCar} onAdd={handleAddNewCar} />
      ) : null}
    </Fragment>
  );
};
