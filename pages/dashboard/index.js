import React from "react";
import NavBar from "../../components/navBar/NavBar";
import GpTable from "../../components/gp-table/GpTable";
import GpButton from "../../components/gp-button/GpButton";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/actionTypes";
import Loader from "../../components/loader/Loader";
import { Box, TextField } from "@mui/material";
import GpToast from "../../components/gp-toast/GpToast";

const Dashboard = () => {
  const [inventory, setInventory] = React.useState([]);
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState("");
  const clickFunction = (value) => {
    if (
      parseInt(value.quantity, 10) <= 0 ||
      parseInt(value.quantity, 10)  > value.Disponible
    ) {
      setMessage("Cantidad no encontrada");
      setTimeout(() => setMessage(""), 3000);
    } else {
      dispatch(addItem(value));
      setMessage("Producto añadido");
      setTimeout(() => setMessage(""), 3000);
    }
  };
  const columns = [
    {
      field: "CodArticulo",
      headerName: "Código",
      headerClassName: "primary-bg",
      sortable: false,
      flex: 0.7,
      // valueGetter: (params) =>
      //   `${params.row.CodAlmacen || ""} ${params.row.CodArticulo || ""}`,
    },
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
      field: "Linea",
      description: "Categoría del artículo",
      headerName: "Categoría",
      sortable: false,
      flex: 1,
      headerClassName: "primary-bg",
    },
    {
      field: "SubLinea",
      description: "Sub categoría del artículo",
      headerName: "Marca",
      sortable: false,
      flex: 1,
      headerClassName: "primary-bg",
    },
    {
      field: "Precio",
      description: "Precio del artículo",
      headerName: "Precio",
      sortable: false,
      flex: 0.5,
      headerClassName: "primary-bg",
      // width: 70,
    },
    {
      field: "quantity",
      headerName: "Cantidad",
      sortable: false,
      flex: 0.5,
      headerClassName: "primary-bg",
      renderCell: (cellValues) => {
        return (
          <TextField
            InputProps={{inputProps: {min:1, max:cellValues.row.Disponible}}}
            id="quantity"
            type="number"
            placeholder="1"
            onChange={(e, value) => {
                cellValues.row.quantity = e.target.value
              }}

          />
        );
      },
      // width: 70,
    },
    {
      field: "Disponible",
      sortable: false,
      headerName: "Disponibilidad",
      flex: 0.5,
      type: "number",
      headerClassName: "primary-bg",
      // width: 70,
      renderCell: (cellValues) => {
        return cellValues.row.Disponible > 0 ? (
          <GpButton text="Sí" bgColor="#48D98A" />
        ) : (
          <GpButton text="No" bgColor="#EC2139" />
        );
      },
    },
    {
      field: "add",
      sortable: false,
      headerName: "Acciones",
      flex: 0.5,
      headerClassName: "primary-bg",
      renderCell: (cellValues) => {
        return (
          <GpButton
            text="Añadir"
            disabled={cellValues.row.Disponible > 0 ? false : true}
            clickFunction={() =>  clickFunction(cellValues.row)
              // dispatch({ type: types.addItem, payload: cellValues })
            }
          />
        );
      },
    },
  ];

  React.useEffect(() => {
    const fetchInventory = async () => {
      const options = {
        method: "GET",
      };

      const res = await fetch(
        "http://intelinet.com.ve:8090/apigrupopuma/inventario",
        options
      );
      const data = await res.json();
      data.map((row) => {
        row.add = "Añadir";
        row.quantity = 1
      });
      setInventory(data);
    };

    fetchInventory();
  }, []);

  return (
    <>
      <NavBar>
        {inventory.length !== 0 ? (
          <GpTable
            columns={columns}
            data={inventory}
            title="Listado de Productos"
            clickFunction={clickFunction}
          ></GpTable>
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
