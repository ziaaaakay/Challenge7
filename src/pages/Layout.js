import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routers } from "../routers/Routers";

export const Layout = () => {
  return (
    <div>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </div>
  );
};
