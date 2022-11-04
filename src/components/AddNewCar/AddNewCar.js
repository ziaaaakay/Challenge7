import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { SectionNavigation } from "../SectionNavigation/SectionNavigation";
import "./AddNewCar.scss";

export const AddNewCar = ({ onAdd, onCancel }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState(null);

  return (
    <>
      <div className="add-new-car-page">
        <SectionNavigation
          sections={[
            { name: "Cars", link: "/dashboard/car" },
            { name: "List Car", link: "/dashboard/car" },
            { name: "Add New Car" },
          ]}
        />
        <h3 className="section-title">Add New Car</h3>
        <form className="form-new-car">
          <div className="form-group">
            <label htmlFor="formName">Nama</label>
            <input
              type="text"
              name="name"
              id="formName"
              className="form-control input-field"
              placeholder="Input Nama Mobil..."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="formCategory">Kategori</label>
            <input
              type="text"
              name="category"
              id="formCategory"
              className="form-control input-field"
              placeholder="Input Kategori Mobil..."
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="formPrice">Harga</label>
            <input
              type="number"
              name="name"
              id="formPrice"
              className="form-control input-field"
              placeholder="Input Harga Mobil..."
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="formPhoto">Foto</label>
            <input
              type="file"
              name="name"
              id="formPrice"
              className="form-control input-field"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="formStatus">Status</label>
            <input
              type="checkbox"
              name="status"
              id="formStatus"
              className="form-check-input input-field"
              onChange={(e) => setStatus(e.target.checked)}
            />
          </div>
          <div className="form-group">
            <label>Start Rent</label>
            <span className="input-field">-</span>
          </div>
          <div className="form-group">
            <label>Finish Rent</label>
            <span className="input-field">-</span>
          </div>
          <div className="form-group">
            <label>Created at</label>
            <span className="input-field">-</span>
          </div>
          <div className="form-group">
            <label>Updated At</label>
            <span className="input-field">-</span>
          </div>
        </form>
        <div className="button-group">
          <Button variant="outline-primary" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => onAdd(name, category, price, status, image)}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};
