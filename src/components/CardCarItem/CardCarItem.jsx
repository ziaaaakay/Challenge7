import React from "react";
import { Button } from "react-bootstrap";
import "./CardCarItem.scss";
import { ReactComponent as CalendarIcon } from "../../assets/img/fi_calendar.svg";
import { ReactComponent as SettingIcon } from "../../assets/img/fi_settings.svg";
import { ReactComponent as UsersIcon } from "../../assets/img/fi_users.svg";
import { useNavigate } from "react-router-dom";

export const CardCarItem = ({
  id,
  img,
  name,
  type,
  price,
  desc,
  seat,
  gear,
  year,
}) => {
  const navigate = useNavigate();

  const convertPriceToRupiah = (price) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    })
      .format(price)
      .split(",")[0];
  };

  const handleClick = () => {
    navigate(`/car/${id}`);
  };

  return (
    <div className="card-container">
      <div className="card-image">
        <img src={img} alt="Car" />
      </div>
      <div className="info-section">
        <span className="car-name">
          {name} / {type}
        </span>
        <span className="price">{convertPriceToRupiah(price)} / hari</span>
        <span className="description">{desc}</span>
      </div>
      <div className="specs-section">
        <span className="specs-item">
          <UsersIcon />
          {seat} orang
        </span>
        <span className="specs-item">
          <SettingIcon />
          {gear}
        </span>
        <span className="specs-item">
          <CalendarIcon />
          Tahun {year}
        </span>
      </div>
      <Button variant="success" onClick={handleClick}>
        Pilih Mobil
      </Button>
    </div>
  );
};
