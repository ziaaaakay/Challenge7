import React, { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchCar } from "../../redux/actions/searchCarActions";
import "./CarSearchForm.scss";

const CarSearchForm = (props) => {
  const navigate = useNavigate();

  const tipeInput = useRef(null);
  const tanggalPesanInput = useRef(null);
  const waktuAmbilInput = useRef(null);
  const jumlahPenumpangInput = useRef(null);

  useEffect(() => {
    if (props.driverType !== "") tipeInput.current.value = props.driverType;
    if (props.date !== "") tanggalPesanInput.current.value = props.date;
    if (props.time !== "") waktuAmbilInput.current.value = props.time;
    if (props.seat !== "") jumlahPenumpangInput.current.value = props.seat;
  }, []);

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    const driverType = tipeInput.current.value;
    const date = tanggalPesanInput.current.value;
    const time = waktuAmbilInput.current.value;
    const seat = jumlahPenumpangInput.current.value;

    props.setSearchCar(driverType, date, time, seat);

    navigate("/search");
  };

  return (
    <div className="car-search">
      <Form className="form-car-search" onSubmit={handleSubmitSearch}>
        <Form.Group className="form-group">
          <Form.Label>Tipe Driver</Form.Label>
          <Form.Select
            className="input-field"
            id="formCarType"
            name="typeCar"
            ref={tipeInput}
            disabled={props.disable}
          >
            <option value="" hidden>
              Pilih Tipe Driver
            </option>
            <option value="0">Tanpa Driver</option>
            <option value="1">Dengan Driver</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Tanggal</Form.Label>
          <Form.Control
            ref={tanggalPesanInput}
            type="date"
            placeholder="Pilih Tanggal"
            className="input-field"
            id="formTanggal"
            name="tanggal"
            disabled={props.disable}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Waktu Jemput/Ambil</Form.Label>
          <Form.Control
            ref={waktuAmbilInput}
            type="time"
            placeholder="Pilih waktu jemput"
            className="input-field"
            id="formWaktuAmbil"
            name="waktuAmbil"
            disabled={props.disable}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Jumlah Penumpang (optional)</Form.Label>
          <Form.Control
            ref={jumlahPenumpangInput}
            type="number"
            min={1}
            placeholder="Jumlah Penumpang"
            className="input-field"
            id="formJumlahPenumpang"
            name="jumlahPenumpang"
            disabled={props.disable}
          />
        </Form.Group>

        {!props.disable ? (
          <Button
            type="submit"
            variant={props.mode === "edit" ? "outline-primary" : "success"}
          >
            {props.mode === "edit" ? "Edit" : "Cari Mobil"}
          </Button>
        ) : (
          ""
        )}
      </Form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    driverType: state.searchCarReducers.driverType,
    date: state.searchCarReducers.date,
    time: state.searchCarReducers.time,
    seat: state.searchCarReducers.seat,
    disable: ownProps.disable,
    mode: ownProps.mode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchCar: (driverType, date, time, seat) =>
      dispatch(SearchCar(driverType, date, time, seat)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarSearchForm);
