import React, { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box, Pagination, Typography } from "@mui/material";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}

const GpTable = ({ columns, data, title, showTotal = false }) => {
  const [total, setTotal] = useState(0);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "3rem",
          height: "95vh",
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

        <div style={{ flexGrow: 1 }}>
          {data && (
            <>
              <DataGrid
                rows={data}
                columns={columns}
                // pageSize={7}
                // rowsPerPageOptions={[2]}
                getRowId={(row) => row.CodArticulo}
                components={{ Toolbar: CustomToolbar }}
                onStateChange={() => {
                  if (showTotal) {
                    const total = data
                      .map((item) => parseFloat(item.Precio))
                      .reduce((a, b) => a + b, 0);
                    showTotal && setTotal(total);
                    console.log(total);
                  }
                }}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
                sx={{
                  borderRadius: "0",
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
                }}
              />
              <Pagination numOfLinks={6} page={data} total={100} />
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
