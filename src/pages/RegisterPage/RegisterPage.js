import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { FormInput } from "../../components/FormInput/FormInput";
import "./RegisterPage.scss";
import JumbotronImage from "../../assets/img/jumbotron.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const RegisterPage = () => {
  const [info, setInfo] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const EMAIL_VALIDATION = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
    const email = e.target.elements.formEmail.value;
    const pass = e.target.elements.formPassword.value;

    // input validation
    if (
      email === "" ||
      pass === "" ||
      !EMAIL_VALIDATION.test(email) ||
      pass.length < 6
    ) {
      showAlert(
        "danger",
        "Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital."
      );
      return;
    }

    axios
      .post("https://rent-car-appx.herokuapp.com/admin/auth/register", {
        email: email,
        password: pass,
        role: "admin",
      })
      .then((res) => {
        if (res.status === 201) {
          showAlert("success", "Register Success!");

          // redirect to login page
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      })
      .catch((err) => {
        showAlert("danger", "Register Failed!");
      });
  };

  const showAlert = (type, message) => {
    setStatus(type);
    setInfo(message);
  };

  return (
    <div className="login-page">
      <div className="jumbotron-section">
        <img src={JumbotronImage} alt="Jumbotron" />
      </div>
      <div className="main-section">
        <div className="title-logo"></div>
        <h3 className="title">Create New Account</h3>
        <Alert show={status !== ""} variant={status}>
          <p>{info}</p>
        </Alert>
        <Form className="login-form" onSubmit={handleRegister}>
          <FormInput
            id={"formEmail"}
            label={"Email"}
            placeholder={"Contoh: user@gmail.com"}
            type={"email"}
          />
          <FormInput
            id={"formPassword"}
            label={"Password"}
            placeholder={"6+ karakter"}
            type={"password"}
          />
          <Button variant="primary" className="form-button w-100" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
};
