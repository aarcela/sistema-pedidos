import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: "#091A5D",
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        justifyContent: "center",
        opacity: "79%",
        position: "fixed",
        width: "100vw",
        zIndex: "1",
      }}
    >
      <Image src="/images/loading.gif" alt="logo" width="350rem" height="350" />
    </Box>
  );
};

export default Loader;
