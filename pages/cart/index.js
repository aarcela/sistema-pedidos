import React from "react";
import { useSelector } from "react-redux";
import GpButton from "../../components/gp-button/GpButton";
import GpTable from "../../components/gp-table/GpTable";
import NavBar from "../../components/navBar/NavBar";
import { types } from "../../types/types";

const Cart = () => {
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
      field: "Precio",
      description: "Precio del artículo",
      headerName: "Precio",
      sortable: false,
      flex: 0.5,
      headerClassName: "primary-bg",
      // width: 70,
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
            text="Borrar"
            clickFunction={() =>
              dispatch({ type: types.addItem, payload: cellValues })
            }
          />
        );
      },
    },
  ];

  const data = useSelector((state) => state.cart);
  console.log(data);

  // store.subscribe(() => console.log(store.getState()));

  return (
    <NavBar>
      {/* <GpTable columns={columns} data={cart} title="Carrito"></GpTable> */}
    </NavBar>
  );
};

export default Cart;
