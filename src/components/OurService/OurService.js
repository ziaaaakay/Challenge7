import React from "react";
import "./OurService.scss";
import ServiceImage from "../../assets/img/img_service.png";

export const OurService = () => {
  return (
    <div className="our-services" id="our-services">
      <div className="container row flex-column gap-5 align-items-center m-auto flex-lg-row">
        <div className="col w-100">
          <img className="w-100" src={ServiceImage} alt="service" />
        </div>
        <div className="col d-flex flex-column gap-2 lgw-50">
          <h2>Best Car Rental for any kind of trip in Gresik!</h2>
          <p>
            Sewa mobil di Gresik bersama Binar Car Rental jaminan harga lebih
            murah dibandingkan yang lain, kondisi mobil baru, serta kualitas
            pelayanan terbaik untuk perjalanan wisata, bisnis, wedding, meeting,
            dll.
          </p>
          <ul className="services-list list-unstyled d-flex flex-column gap-2">
            <li className="service-item">
              Sewa Mobil Dengan Supir di Bali 12 Jam
            </li>
            <li className="service-item">
              Sewa Mobil Lepas Kunci di Bali 24 Jam
            </li>
            <li className="service-item">Sewa Mobil Jangka Panjang Bulanan</li>
            <li className="service-item">
              Gratis Antar - Jemput Mobil di Bandara
            </li>
            <li className="service-item">
              Layanan Airport Transfer / Drop In Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
