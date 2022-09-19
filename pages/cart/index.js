import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GpButton from "../../components/gp-button/GpButton";
import GpTable from "../../components/gp-table/GpTable";
import NavBar from "../../components/navBar/NavBar";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeItem } from "../../redux/actionTypes";
import { Box } from "@mui/system";

const Cart = () => {
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
      headerName: "Borrar",
      // flex: 1,
      headerClassName: "primary-bg",
      renderCell: (cellValues) => {
        return (
          <GpButton
            icon={<DeleteIcon />}
            bgColor="transparent"
            textColor="#505050"
            clickFunction={() =>
              dispatch(removeItem(cellValues.row.CodArticulo))
            }
          />
        );
      },
    },
  ];

  const data = useSelector((state) => state.cart);
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    setCart(data);
  }, [data]);

  console.log("Cart state cart redux: ", cart);
  // store.subscribe(() => console.log(store.getState()));

  return (
    <NavBar>
      <GpTable
        columns={columns}
        data={cart}
        title="Carrito"
        showTotal="true"
      ></GpTable>
      <Box
        sx={{
          justifyContent: "flex-end",
          display: "flex",
          flexDirection: "row",
          padding: "0 3rem 3rem 3rem",
          width: "100%",
        }}
      >
        {cart.length > 0 && (
          <GpButton
            text="Confirmar Pedido"
            clickFunction={() => alert("Siguiente Sprint - Creando Pedidos")}
          ></GpButton>
        )}
      </Box>
    </NavBar>
  );
};

export default Cart;
