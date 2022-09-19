import React from "react";
import NavBar from "../../components/navBar/NavBar";
import GpTable from "../../components/gp-table/GpTable";
import GpButton from "../../components/gp-button/GpButton";
// import { cartReducer } from "../../redux/reducer/cartReducer";
import { types } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/actionTypes";

const Dashboard = () => {
  const [inventory, setInventory] = React.useState([]);
  // const [state, dispatch] = React.useReducer(cartReducer, { cart: [] });
  const dispatch = useDispatch();
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
      flex: 0.5,
      headerClassName: "primary-bg",
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
      // flex: 1,
      headerClassName: "primary-bg",
      renderCell: (cellValues) => {
        return (
          <GpButton
            text="Añadir"
            clickFunction={
              () => dispatch(addItem(cellValues.row))
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
        "https://62ffa2209350a1e548e34651.mockapi.io/apigrupopuma/inventario",
        options
      );
      const data = await res.json();
      data.map((row) => {
        row.add = "Añadir";
      });
      setInventory(data);
    };

    fetchInventory();
  }, []);

  return (
    <>
      <NavBar>
        {inventory.length !== 0 && (
          <GpTable
            columns={columns}
            data={inventory}
            title="Listado de Productos"
          ></GpTable>
        )}
      </NavBar>
    </>
  );
};

export default Dashboard;
