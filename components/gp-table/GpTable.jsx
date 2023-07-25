import React, { useState } from "react";
import {
  DataGrid,
  GridFilterPanel,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  esES
} from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";


function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
    >
      <GridFilterPanel />
      <GridToolbarQuickFilter sx={{alignSelf:'end'}}/>
    </GridToolbarContainer>
  );
}

const GpTable = ({ columns, data, title, showTotal = false, clickFunction, height = "70vh" }) => {
  const [total, setTotal] = useState(0);
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
        <Typography
          component="strong"
          variant="h4"
          color="#505050"
          fontWeight="lighter"
          sx={{ marginBottom: "2rem" }}
        >
          {title}
        </Typography>

        <div style={{ flexGrow: 1, height: height, width: "100%" }}>
          {data && (
            <>
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={data}
                columns={columns}
                // pageSize={7}
                // rowsPerPageOptions={[2]}
                getRowId={(row) => {
                  if (title === "Pedidos") {
                    return row.fact_num + Math.random();
                  }
                  if (title === "Detalle Pedido") return row.codProducto + Math.random();
                  return row.CodArticulo + Math.random();
                }}
                components={{ Toolbar: CustomToolbar }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    // quickFilterProps: { debounceMs: 500 },
                  },
                }}
                onStateChange={() => {
                  if (showTotal) {
                    const total = data
                      .map((item) => parseFloat(item.Precio))
                      .reduce((a, b) => a + b, 0);
                    showTotal && setTotal(total);
                  }
                }}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
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
          <Typography
            component="strong"
            variant="h4"
            color="#505050"
            fontWeight="bold"
          >
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
