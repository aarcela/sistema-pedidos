import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GpButton from "../../components/gp-button/GpButton";
import GpTable from "../../components/gp-table/GpTable";
import NavBar from "../../components/navBar/NavBar";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeItem } from "../../redux/actionTypes";
import { Box } from "@mui/system";
import { auth, db } from "../../firebase/firebaseConfig";
import { orderState } from "../../types/orderStates";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

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
  const [user] = useAuthState(auth);

  const createOrder = async () => {
    const total = cart
      .map((item) => parseFloat(item.Precio))
      .reduce((a, b) => a + b, 0);

    const docRef = await addDoc(collection(db, "orders"), {
      order: cart,
      date: new Date().toLocaleDateString(),
      state: orderState.pending,
      user: user?.uid,
      total: total,
    });

    console.log("Ref: ", docRef.id);
  };

  React.useEffect(() => {
    setCart(data);
  }, [data]);

  console.log("Cart state cart redux: ", cart);
  // store.subscribe(() => console.log(store.getState()));

  return (
    <NavBar>
      <GpTable
        columns={columns}
        data={cart.cart}
        title="Carrito"
        showTotal="true"
        height="50vh"
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
            clickFunction={() => createOrder()}
          ></GpButton>
        )}
      </Box>
    </NavBar>
  );
};

export default Cart;
