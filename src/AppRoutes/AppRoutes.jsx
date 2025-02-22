import React from "react";
import Home from "../Pages/Home/Home";
import { Route, Routes } from "react-router";
import Login from "../Pages/Login/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <>
            <title>Home | Task Manager</title>

            <Home />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <title>Item Details | Food Zone</title>

            <Login />
          </>
        }
      />

      {/*       <Route
        path="/food/:id"
        element={
          <>
            <Helmet>
              <title>Item Details | Food Zone</title>
            </Helmet>
            <FoodDetails />
          </>
        }
      /> */}

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
