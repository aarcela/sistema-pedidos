import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import GpTable from "../gp-table/GpTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const GpModal = ({ isOpen, modalData }) => {

  const [openModal, setOpenModal] = React.useState(false)

  const columns = [
    {
      field: "descripcion",
      headerName: "Descripcion",
      headerClassName: "primary-bg",
      sortable: false,
      flex: 1,
      // valueGetter: (params) =>
      //   `${params.row.CodAlmacen || ""} ${params.row.CodArticulo || ""}`,
    },
    {
      field: "prec_vta1",
      description: "Precio",
      headerName: "Precio",
      sortable: false,
      flex: 0.5,
      headerClassName: "primary-bg",
      // width: 70,
    },
    {
      field: "cantidad",
      description: "Cantidad de articulo",
      headerName: "Cantidad",
      sortable: false,
      flex: 0.5,
      headerClassName: "primary-bg",
      // width: 70,
    },
  ];
  React.useEffect(() => {
    setOpenModal(isOpen)
  }, [isOpen, modalData])
  
  
  return (
    <>
      <Modal
        hideBackdrop
        open={openModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        onClick={() => setOpenModal(false)}
      >
        <Box sx={{ ...style, width: '80vw', height: '80vh' }}>
          <Grid container spacing={{ xs: 1 }}>
            <Grid item xs={6}>
              <Grid item xs={12}>
                <Typography
                  component="strong"
                  variant="h5"
                  color="#091A5D"
                  fontWeight="bold"
                  sx={{ marginBottom: "2rem" }}
                >
                  Pedido {modalData.fact_num}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="span" color="#000000" fontWeight="bold">
                  Enviado a:
                </Typography>
              </Grid>
              <p id="child-modal-description">{modalData.cliente}</p>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Grid item xs={12}>
                <Typography variant="span" color="#000000" fontWeight="bold">
                  Fecha: {modalData.fecha}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="span" color="#000000" fontWeight="bold">
                  Resumen
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <GpTable
            data={modalData.productos}
            columns={columns}
            title='Detalle Pedido'
            height="50vh"
          ></GpTable>

          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </Box>
      </Modal>
    </>
  );
};

export default GpModal;
