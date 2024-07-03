import { Box, Card, CardContent, CardMedia, TextField, Tooltip, Typography } from "@mui/material";
import React from "react";
import GpButton from "../gp-button/GpButton";
import { useSelector } from "react-redux";

const GpDetailProduct = ({ selected, clickFunction, handleClose }) => {
  const [total, setTotal] = React.useState(0);
  const [precio, setPrecio] = React.useState(0);
  const userData = useSelector((state) => state.user);

  React.useEffect(() => {
    if (userData.user[0].tip_cli.trim() === "01") setPrecio(selected.Precio);
    if (userData.user[0].tip_cli.trim() === "02") setPrecio(selected.Precio2);
    if (userData.user[0].tip_cli.trim() === "03") setPrecio(selected.Precio3);
    if (userData.user[0].tip_cli.trim() === "04") setPrecio(selected.Precio4);
    if (userData.user[0].tip_cli.trim() === "05") setPrecio(selected.Precio5);
    setTotal(precio);
  }, [userData.user, selected.Precio, selected.Precio2, selected.Precio3, selected.Precio4, selected.Precio5, precio]);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(9, 26, 93, 0.76)",
        display: "flex",
        position: "fixed",
        width: "100vw",
        height: "100%",
        zIndex: "1",
        top: "0",
        flexDirection: "column",
        alignItems: "stretch",
      }}
      // onClick={handleClose}
    >
      <Card
        className="secondary-bg"
        sx={{
          width: "50%",
          display: "flex",
          // justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "1rem",
          borderRadius: "0",
          borderBottom: "1px solid #ccc",
          margin: "auto",
          height: "auto",
          marginLeft: "15%",
          zIndex: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "50%", height: "70%" }}
          image="/images/img_not_available.jpg"
          alt="Grupo Puma"
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "start",
            flexDirection: "column",
            gap: "2rem",
            width: "70%",
          }}
        >
          <Typography color="black" fontWeight="bold">
            COD: {selected.CodAlmacen}
          </Typography>
          <Tooltip title={selected.Descripcion}>
            <span
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <Typography variant="p" color="black" fontWeight="bold" style={{ wordWrap: "break-word" }}>
                {selected.Descripcion}
              </Typography>
            </span>
          </Tooltip>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "1.5rem",
                flexDirection: "column",
              }}
            >
              <Typography color="black" fontWeight="bold">
                Precio:
              </Typography>
              <Typography color="black" fontWeight="bold">
                Cantidad:
              </Typography>
              <Typography color="black" fontWeight="bold">
                Total:
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
              <Typography color="black">{precio}</Typography>
              <TextField
                InputProps={{
                  inputProps: { min: 1, max: selected.Disponible },
                }}
                sx={{ width: "4rem" }}
                type="number"
                size="small"
                placeholder="1"
                onChange={(e, value) => {
                  selected.quantity = e.target.value;
                  setTotal((selected.quantity * precio).toFixed(2));
                }}
              />
              <Typography color="black" fontWeight="bold">
                {total}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <GpButton
              text="Añadir"
              disabled={selected.Disponible > 0 ? false : true}
              clickFunction={() => clickFunction(selected)}
            />
            <GpButton text="Seguir comprando" bgColor="#505050" clickFunction={() => handleClose()} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GpDetailProduct;
