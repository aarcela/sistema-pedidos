import React from "react";
import {
  Box,
  Pagination,
  Typography,
} from "@mui/material";
import NavBar from "../../components/navBar/NavBar";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

const columns = [
  {
    field: "Descripcion",
    headerName: "Descripcion",
    headerClassName: "primary-bg",
    sortable: false,
    flex: 1,
    // valueGetter: (params) =>
    //   `${params.row.CodAlmacen || ""} ${params.row.CodArticulo || ""}`,
  },
  {
    field: "Categoria",
    description: "Categoría del artículo",
    headerName: "Categoría",
    sortable: false,
    flex: 1,
    headerClassName: "primary-bg",
  },
  {
    field: "Precio",
    description: "Precio del artículo",
    headerName: "Precio",
    sortable: false,
    flex: 1,
    headerClassName: "primary-bg",
  },
  {
    field: "Disponible",
    sortable: false,
    headerName: "Disponibilidad",
    flex: 1,
    type: "number",
    headerClassName: "primary-bg",
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PROFIT_API_URL}/inventario`);
  const data = await res.json();

  return { props: { data } };
}

const Dashboard = ({ data }) => {
  return (
    <>
      <NavBar></NavBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "3rem",
          height: "100vh",
          width: "97vw",
        }}
      >
        <Typography
          component="strong"
          variant="h4"
          color="#505050"
          fontWeight="lighter"
          sx={{ marginBottom: "2rem" }}
        >
          Listado de Productos
        </Typography>

        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[2]}
            getRowId={(row) => row.CodArticulo}
            components={{ Toolbar: CustomToolbar }}
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
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
          <Pagination numOfLinks={6} page={data} total={100} />
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

export default Dashboard;
