import { Button } from "react-bootstrap";
import React from "react";
import { ReactComponent as ClockIcon } from "../../assets/img/fi_clock.svg";
import { ReactComponent as KeyIcon } from "../../assets/img/fi_key.svg";
import { ReactComponent as DeleteIcon } from "../../assets/img/fi_trash-2.svg";
import { ReactComponent as EditIcon } from "../../assets/img/fi_edit.svg";
import "./ListCarItem.scss";

export const ListCarItem = ({
  name,
  type,
  image,
  price,
  start,
  finish,
  lastUpdate,
  onDelete,
  onEdit,
}) => {
  const convertToRupiah = (number) => {
    const format = number.toString().split("").reverse().join("");
    const convert = format.match(/\d{1,3}/g);
    const rupiah = "Rp " + convert.join(".").split("").reverse().join("");

    return rupiah;
  };

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  }

  return (
    <div className="car-item">
      <div className="car-image">
        <img src={image} alt="car" />
      </div>
      <div className="description">
        <p className="name">{`${name} / ${type}`}</p>
        <p className="price">{`${convertToRupiah(
          price ? price : 0
        )} / hari`}</p>
        <div className="duration icon-and-text">
          <KeyIcon />
          <p className="text">{`${convertDate(start)} - ${convertDate(
            finish
          )}`}</p>
        </div>
        <div className="last-update icon-and-text">
          <ClockIcon />
          <p className="text">{convertDate(lastUpdate)}</p>
        </div>
        <div className="button-group">
          <Button variant="outline-danger" onClick={onDelete}>
            <DeleteIcon />
            Delete
          </Button>
          <Button variant="success" onClick={onEdit}>
            <EditIcon />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};
