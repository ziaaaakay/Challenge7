import React from "react";
import { Form } from "react-bootstrap";
import "./FormInput.scss";

export const FormInput = ({
  id,
  label,
  type,
  placeholder,
  handleChange,
  handleClick,
}) => {
  return (
    <Form.Group className="form-group" controlId={id}>
      <Form.Label className="form-label">{label}</Form.Label>
      <Form.Control
        className="form-input"
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        onClick={handleClick}
        name={id}
      />
    </Form.Group>
  );
};
