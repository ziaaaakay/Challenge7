import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchCarPage from "../pages/CarPage/SearchCarPage";
import CarDetailPage from "../pages/CarPage/CarDetailPage";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";
import { Homepage } from "../pages/Homepage/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { PaymentPage } from "../pages/PaymentPage/PaymentPage";
import { LayoutDefault } from "../pages/LayoutDefault/LayoutDefault";

export const Routers = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<LayoutDefault content={<Homepage />} />}
      />
      <Route
        path="/search"
        element={<LayoutDefault content={<SearchCarPage />} />}
      />
      <Route
        path="/car"
        element={<LayoutDefault content={<CarDetailPage />} />}
      >
        <Route
          path="/car/:id"
          element={<LayoutDefault content={<CarDetailPage />} />}
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />}>
        <Route path=":first" element={<DashboardPage />} />
      </Route>
      <Route
        path="/order"
        element={<LayoutDefault content={<PaymentPage />} />}
      />
    </Routes>
  );
};
