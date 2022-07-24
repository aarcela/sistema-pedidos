import React from "react";
import {
  Autocomplete,
  Box,
  Grid,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import NavBar from "../../components/navBar/NavBar";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Dashboard = () => {
  return (
    <>
      <NavBar></NavBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "3rem",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Typography
          variant="h4"
          color="#505050"
          fontWeight="lighter"
          sx={{ marginBottom: "2rem" }}
        >
          Listado de Productos
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Marca" />}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Categoría" />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={top100Films.map((option) => option.label)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Código"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <TableContainer
          component={Paper}
          sx={{ borderRadius: "0", marginTop: "1rem" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }} align="left">
                  Código
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Imagen
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Nombre
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Categoría
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Precio
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Cantidad
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Disponibilidad
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right">
                    <Slider defaultValue={3} max={10} />
                  </TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Dashboard;
