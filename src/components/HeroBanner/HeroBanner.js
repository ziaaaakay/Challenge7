import React from "react";
import "./HeroBanner.scss";
import CarImage from "../../assets/img/img_car.png";

export const HeroBanner = () => {
  return (
    <div className="hero-section">
      <div className="section-1">
        <h3>Sewa dan Rental Mobil Terbaik di kawasan (Lokasimu)</h3>
        <p>
          Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas
          terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu
          untuk sewa mobil selama 24 jam.
        </p>
      </div>
      <div className="section-2">
        <img src={CarImage} alt="Car" />
      </div>
    </div>
  );
};
