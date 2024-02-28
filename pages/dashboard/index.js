import React from "react";
import NavBar from "../../components/navBar/NavBar";
import GpTable from "../../components/gp-table/GpTable";
import GpButton from "../../components/gp-button/GpButton";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/actionTypes";
import Loader from "../../components/loader/Loader";
import { Box, Card, CardContent, TextField, Tooltip, Typography } from "@mui/material";
import GpToast from "../../components/gp-toast/GpToast";
import GpCard from "../../components/gp-card/GpCard";
import { GpCategoryFilter } from "../../components/gp-category-filter/GpCategoryFilter";
import GpPagination from "../../components/gp-pagintation/GpPagination";

const Dashboard = () => {
  const dispatch = useDispatch();
  const rowsPerPage = 10;
  const [inventory, setInventory] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = React.useState("");
  const [inputSearch, setInputSearch] = React.useState("");
  const clickFunction = (value) => {
    if (parseInt(value.quantity, 10) <= 0 || parseInt(value.quantity, 10) > value.Disponible) {
      setMessage("Cantidad no encontrada");
      setTimeout(() => setMessage(""), 3000);
    } else {
      dispatch(addItem(value));
      setMessage("Producto añadido");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  React.useEffect(() => {
    const fetchInventory = async () => {
      const options = {
        method: "GET",
      };

      const res = await fetch("http://intelinet.com.ve:8090/apigrupopuma/inventario/articulosconstock", options);
      const data = await res.json();

      data.map((row) => (row.quantity = 1));
      setInventory(data);
      setTotalPages(Math.ceil(data.length / rowsPerPage));
    };
    fetchInventory();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSubcategoryChange = (value) => {
    setSelectedSubcategory(value.target.value);
  };

  const handleSearch = (value) => {
    setInputSearch(value.target.value);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, inventory.slice(page * rowsPerPage - 1).length);

  return (
    <>
      <NavBar>
        {inventory.length !== 0 ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              flexDirection: "column",
              paddingTop: "3rem",
            }}
          >
            <Typography component="strong" variant="h4" color="#505050" fontWeight="lighter" sx={{ margin: "2rem" }}>
              Listado de Productos
            </Typography>

            <GpCategoryFilter handleSubcategoryChange={handleSubcategoryChange} handleSearch={handleSearch} />
            {inventory
              .filter((item) => item.SubLinea.toLowerCase().includes(selectedSubcategory.toLocaleLowerCase()))
              .filter((item) => item.CodAlmacen.toLowerCase().includes(inputSearch.toLocaleLowerCase()))
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((item, index) => (
                <GpCard key={index} data={item} clickFunction={() => clickFunction(item)} />
              ))}
            <GpPagination
              handleChangePage={handleChangePage}
              page={page}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Loader />
          </Box>
        )}
      </NavBar>
      {message && <GpToast message={message} />}
    </>
  );
};

export default Dashboard;
