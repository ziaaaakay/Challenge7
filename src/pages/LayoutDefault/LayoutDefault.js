import React from "react";
import { NavbarDefault } from "../../components/Navbar/NavbarDefault";
import { Footer } from "../../components/Footer/Footer";

export const LayoutDefault = ({ content }) => {
  return (
    <>
      <NavbarDefault />
      {content}
      <Footer />
    </>
  );
};
