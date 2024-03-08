import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div>
      <>
        <div className="overloay z-50"></div>
        <div className=" absolute lg:left-1/2 top-1/2 sm:top-1/2 left-1/2">
          <Box sx={{ display: "flex" }}>
            <CircularProgress color="primary" />
          </Box>
        </div>
      </>
    </div>
  );
};

export default Spinner;
