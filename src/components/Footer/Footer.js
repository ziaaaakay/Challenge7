import React from "react";
import "./Footer.scss";
import IconFacebook from "../../assets/img/icon_facebook.png";
import IconInstagram from "../../assets/img/icon_instagram.png";
import IconTwitter from "../../assets/img/icon_twitter.png";
import IconTwitch from "../../assets/img/icon_twitch.png";
import IconMail from "../../assets/img/icon_mail.png";

export const Footer = () => {
  return (
    <footer>
      <div className="container d-flex flex-column flex-lg-row justify-content-lg-between">
        <div className="section-1 d-flex flex-column">
          <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
          <p>binarcarrental@gmail.com</p>
          <p>081-233-334-808</p>
        </div>
        <div className="section-2 d-flex flex-column gap-3">
          <a href="/">Our Services</a>
          <a href="/">Why Us</a>
          <a href="/">Testimonial</a>
          <a href="/">FAQ</a>
        </div>
        <div className="section-3 d-flex flex-column">
          <p>Connect with us</p>
          <div className="social-media d-flex gap-2">
            <a href="/">
              <img src={IconFacebook} alt="Facebook" />
            </a>
            <a href="/">
              <img src={IconInstagram} alt="Instagram" />
            </a>
            <a href="/">
              <img src={IconFacebook} alt="Twitter" />
            </a>
            <a href="/">
              <img src={IconMail} alt="Mail" />
            </a>
            <a href="/">
              <img src={IconTwitch} alt="Twitch" />
            </a>
          </div>
        </div>
        <div className="section-4">
          <p>Copyright Binar 2022</p>
          <div className="logo"></div>
        </div>
      </div>
    </footer>
  );
};
