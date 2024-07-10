import React, { useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const GpTable = ({ columns, data, title, showTotal = false, clickFunction, height = "70vh" }) => {
  const [total, setTotal] = useState(0);
  const userData = useSelector((state) => state.user);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "3rem",
          width: "100%",
        }}
      >
        <Typography component="strong" variant="h4" color="#505050" fontWeight="lighter" sx={{ marginBottom: "2rem" }}>
          {title}
        </Typography>

        <div style={{ flexGrow: 1, height: height, width: "100%" }}>
          {data && (
            <>
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={data}
                columns={columns}
                getRowId={(row) => {
                  if (title === "Pedidos") {
                    return row.fact_num + Math.random();
                  }
                  if (title === "Detalle Pedido") return row.codProducto + Math.random();
                  return row.CodArticulo + Math.random();
                }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
                onStateChange={() => {
                  if (showTotal) {
                    let total;
                    if (userData.user[0].tip_cli.trim() === "01") {
                      total = data.map((item) => parseFloat(item.Precio) * item.quantity).reduce((a, b) => a + b, 0);
                    }
                    if (userData.user[0].tip_cli.trim() === "02") {
                      total = data.map((item) => parseFloat(item.Precio2) * item.quantity).reduce((a, b) => a + b, 0);
                    }
                    if (userData.user[0].tip_cli.trim() === "03") {
                      total = data.map((item) => parseFloat(item.Precio3) * item.quantity).reduce((a, b) => a + b, 0);
                    }
                    if (userData.user[0].tip_cli.trim() === "04") {
                      total = data.map((item) => parseFloat(item.Precio4) * item.quantity).reduce((a, b) => a + b, 0);
                    }

                    showTotal && setTotal(total.toFixed(2));
                  }
                }}
                getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
                sx={{
                  borderRadius: "0",
                  maxHeight: "440",
                  ".primary-bg": {
                    backgroundColor: "#091a5d",
                    borderRadius: "0",
                    color: "white",
                    width: "100%",
                  },
                  ".even": {
                    backgroundColor: "#E7E7E7",
                  },
                  ".odd": {
                    backgroundColor: "white",
                  },
                  ".add-button": {
                    color: "red",
                  },
                  ".MuiDataGrid-filterIcon": {
                    color: "#091a5d",
                  },
                  ".MuiDataGrid-toolbarContainer": {
                    marginBottom: "2rem",
                  },
                }}
              />
            </>
          )}
        </div>
        <Typography component="strong" variant="h6" color="#505050">
          Los precios no incluyen IVA
        </Typography>
      </Box>
      {showTotal && (
        <Box
          sx={{
            justifyContent: "flex-end",
            display: "flex",
            flexDirection: "row",
            padding: "3rem",
            width: "100%",
          }}
        >
          <Typography component="strong" variant="h4" color="#505050" fontWeight="bold">
            Total: {total} USD
          </Typography>
        </Box>
      )}
      <style jsx>
        {`
          .primary-bg {
            background-color: #091a5d;
            color: white;
          }
        `}
      </style>
    </>
  );
};

export default GpTable;
