import React from "react";
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

const GpTable = ({ columns, data, title }) => {
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
                pageSize={7}
                rowsPerPageOptions={[2]}
                getRowId={(row) => row.CodArticulo}
                components={{ Toolbar: CustomToolbar }}
                // onCellClick={(params, event) => {
                //   if (!event.ctrlKey) {
                //     event.defaultMuiPrevented = true;
                //     console.log("Params", params);
                //   }
                // }}
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
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
              />
              <Pagination numOfLinks={6} page={data} total={100} />
            </>
          )}
        </div>
      </Box>
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
