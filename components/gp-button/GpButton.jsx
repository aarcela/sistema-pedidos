import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const GpButton = ({
  icon = "",
  text,
  textColor = "white",
  bgColor = "#091A5D",
  clickFunction,
}) => {
  return (
    <Button
      startIcon={icon}
      sx={{
        backgroundColor: bgColor,
        color: textColor,
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
