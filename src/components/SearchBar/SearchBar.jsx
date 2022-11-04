import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import "./SearchBar.scss";

export const SearchBar = () => {
  return (
    <Form className="d-flex searchbar">
      <FormControl
        type="search"
        placeholder="Search"
        className="input-search"
        aria-label="Search"
      />
      <Button variant="outline-primary">Search</Button>
    </Form>
  );
};
