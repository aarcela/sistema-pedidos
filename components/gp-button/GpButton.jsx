import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const GpButton = ({ icon = "", text, clickFunction }) => {
  return (
    <Button
      startIcon={icon}
      sx={{
        backgroundColor: "#091A5D",
        color: "white",
        borderRadius: "0",
      }}
      onClick={clickFunction}
    >
      {text}
    </Button>
  );
};

GpButton.propTypes = {
  text: PropTypes.string,
};

export default GpButton;
