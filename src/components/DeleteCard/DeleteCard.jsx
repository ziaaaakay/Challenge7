import React from "react";
import "./DeleteCard.scss";
import DeleteIllus from "../../assets/img/img-BeepBeep.png";
import { Button } from "react-bootstrap";

export const DeleteCard = ({ onAccept, onCancel }) => {
  return (
    <div className="delete-section">
      <div className="delete-card">
        <div className="image">
          <img src={DeleteIllus} alt="Illustration" />
        </div>
        <h3>Menghapus Data Mobil</h3>
        <p>
          Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin
          menghapus?
        </p>
        <div className="button-group">
          <Button variant="primary" onClick={onAccept}>
            Ya
          </Button>
          <Button variant="outline-primary" onClick={onCancel}>
            Tidak
          </Button>
        </div>
      </div>
    </div>
  );
};
