import { Box, Card, CardContent, CardMedia, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import GpButton from "../gp-button/GpButton";
import GpDetailProduct from "../gp-detail-product/GpDetailProduct";

const GpCard = ({ data, clickFunction }) => {
  const [selected, setselected] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClick = (data) => {
    setOpen(true);
    setselected(data);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {data && (
        <Card
          className="secondary-bg"
          sx={{
            width: "95%",
            height: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "1rem",
            borderRadius: "0",
            borderBottom: "1px solid #ccc",
            margin: "auto",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 75, height: 75, flexBasis: "10%" }}
            image="/images/img_not_available.jpg"
            alt="Grupo Puma"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "50%",
              flexGrow: "0",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
              }}
            >
              <Typography color="black" fontWeight="bold">
                COD: {data.CodAlmacen.trim()}
              </Typography>
              <Tooltip title={data.Descripcion.trim()}>
                <span
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  <Typography variant="p" color="black" fontWeight="bold" style={{ wordWrap: "break-word" }}>
                    {data.Descripcion.trim()}
                  </Typography>
                </span>
              </Tooltip>
            </CardContent>
          </Box>
          <Box sx={{ display: "flex", flexBasis: "10%", flexDirection: "column" }}>
            <Typography variant="subtitle1" color="black" component="div">
              Precio:
            </Typography>
            <Typography variant="subtitle1" color="black" component="div">
              REF: {data.Precio}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
              flexBasis: "20%",
              marginRight: "1rem",
              justifyContent: "space-between",
            }}
          >
            {(data.Disponible > 0) & (data.Precio > 0) ? (
              <GpButton text="Disponible" bgColor="#48D98A" />
            ) : (
              <GpButton text="No Disponible" bgColor="#EC2139" />
            )}

            <GpButton
              text="Añadir"
              disabled={(data.Disponible > 0) & (data.Precio > 0) ? false : true}
              clickFunction={() => handleClick(data)}
            />
          </Box>
        </Card>
      )}
      {open && <GpDetailProduct selected={selected} clickFunction={clickFunction} handleClose={handleClose} />}
    </>
  );
};

export default GpCard;
