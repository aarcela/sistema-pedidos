import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GpButton from "../../components/gp-button/GpButton";
import GpTable from "../../components/gp-table/GpTable";
import NavBar from "../../components/navBar/NavBar";
import DeleteIcon from "@mui/icons-material/Delete";
import { emptyCart, removeItem } from "../../redux/actionTypes";
import { Box } from "@mui/system";
import axios from "axios";
import GpToast from "../../components/gp-toast/GpToast";
import Loader from "../../components/loader/Loader";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();
  const clickFunction = (value) => dispatch(removeItem(value));
  const router = useRouter();
  const userData = useSelector((state) => state.user);
  const columns = [
    {
      field: "Descripcion",
      headerName: "Descripcion",
      headerClassName: "primary-bg",
      sortable: false,
      flex: 1,
      // valueGetter: (params) =>
      //   `${params.row.CodAlmacen || ""} ${params.row.CodArticulo || ""}`,
      renderCell: (params) => (
        <Tooltip title={params.row.Descripcion}>
          <span
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {params.row.Descripcion}
          </span>
        </Tooltip>
      ),
    },
    {
      field: "quantity",
      headerName: "Cantidad",
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
      renderCell: (cellValues) => {
        let condicionalPrice;

        if (userData.user[0].precio_a.trim() === "01") condicionalPrice = cellValues.row.Precio;
        if (userData.user[0].precio_a.trim() === "02") condicionalPrice = cellValues.row.Precio2;
        if (userData.user[0].precio_a.trim() === "03") condicionalPrice = cellValues.row.Precio3;
        if (userData.user[0].precio_a.trim() === "04") condicionalPrice = cellValues.row.Precio4;
        if (userData.user[0].precio_a.trim() === "05") condicionalPrice = cellValues.row.Precio5;

        return +condicionalPrice;
      },
      // width: 70,
    },
    {
      field: "Subtotal",
      description: "Subtotal",
      headerName: "Subtotal",
      sortable: false,
      flex: 0.5,
      headerClassName: "primary-bg",
      renderCell: (cellValues) => {
        let condicionalPrice;

        if (userData.user[0].precio_a.trim() === "01") condicionalPrice = cellValues.row.Precio;
        if (userData.user[0].precio_a.trim() === "02") condicionalPrice = cellValues.row.Precio2;
        if (userData.user[0].precio_a.trim() === "03") condicionalPrice = cellValues.row.Precio3;
        if (userData.user[0].precio_a.trim() === "04") condicionalPrice = cellValues.row.Precio4;
        if (userData.user[0].precio_a.trim() === "05") condicionalPrice = cellValues.row.Precio5;

        return +(condicionalPrice * cellValues.row.quantity).toFixed(2);
      },
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
            clickFunction={() => clickFunction(cellValues.row.CodArticulo)}
          />
        );
      },
    },
  ];

  const data = useSelector((state) => state.cart);
  const [cart, setCart] = React.useState([]);
  const [responseMessage, setResponseMessage] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const createOrder = async () => {
    setIsLoading(true);
    if (!userData) {
      setIsLoading(false);
      return;
    }

    const headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // const subTotal = cart?.cart?.map((item) => parseFloat(item.subTotal)).reduce((a, b) => a + b, 0);
    let subTotal;
    if (userData.user[0].precio_a.trim() === "01") {
      subTotal = cart?.cart?.map((item) => parseFloat(item.Precio) * item.quantity).reduce((a, b) => a + b, 0);
    }
    if (userData.user[0].precio_a.trim() === "02") {
      subTotal = cart?.cart?.map((item) => parseFloat(item.Precio2) * item.quantity).reduce((a, b) => a + b, 0);
    }
    if (userData.user[0].precio_a.trim() === "03") {
      subTotal = cart?.cart?.map((item) => parseFloat(item.Precio3) * item.quantity).reduce((a, b) => a + b, 0);
    }
    if (userData.user[0].precio_a.trim() === "04") {
      subTotal = cart?.cart?.map((item) => parseFloat(item.Precio4) * item.quantity).reduce((a, b) => a + b, 0);
    }
    if (userData.user[0].precio_a.trim() === "05") {
      subTotal = cart?.cart?.map((item) => parseFloat(item.Precio5) * item.quantity).reduce((a, b) => a + b, 0);
    }

    const cartPedido = cart?.cart?.map((element) => {
      let condicionalPrice;

      console.log(userData.user[0].precio_a.trim());
      console.log("Data: ", element);

      if (userData.user[0].precio_a.trim() === "01") condicionalPrice = element.Precio;
      if (userData.user[0].precio_a.trim() === "02") condicionalPrice = element.Precio2;
      if (userData.user[0].precio_a.trim() === "03") condicionalPrice = element.Precio3;
      if (userData.user[0].precio_a.trim() === "04") condicionalPrice = element.Precio4;
      if (userData.user[0].precio_a.trim() === "05") condicionalPrice = element.Precio5;

      return {
        CodProducto: element.CodArticulo,
        Precio: condicionalPrice.toFixed(2),
        Cantidad: element.quantity,
      };
    });

    //TODO: CHECK IN PRODUCTION FOR TH CORRECT COD AND RIF
    const body = {
      // codCliente: "200042362",
      codCliente: userData?.user[0]?.co_cli ? userData?.user[0]?.co_cli : "200042362",
      codVendedorProfit: "puma",
      descuento: 0,
      descuentoPorcentaje: 0,
      impuesto: 0,
      subTotal: subTotal.toFixed(2),
      total: subTotal.toFixed(2),
      rif: userData?.user[0]?.rif ? userData?.user[0]?.rif : '"J-000"',
      PedidoDetalle: cartPedido,
    };
    console.log(body);

    axios
      .post("http://38.170.153.244:50000/pedido/crearpedido", body, headers)
      .then(function (response) {
        setResponseMessage("Pedido creado");
        dispatch(emptyCart());
        router.push("/orders");
      })
      .catch(function (error) {
        setResponseMessage("Error creando pedido");
      })
      .finally(function () {
        setIsLoading(false);
        setTimeout(() => setResponseMessage(""), 3000);
      });
  };

  React.useEffect(() => {
    setCart(data);
  }, [data]);

  return (
    <>
      <NavBar>
        {isLoading === true && (
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
        <GpTable
          columns={columns}
          data={cart.cart}
          title="Carrito"
          showTotal="true"
          height="50vh"
          clickFunction={clickFunction}
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
          {cart?.cart?.length > 0 && <GpButton text="Confirmar Pedido" clickFunction={() => createOrder()}></GpButton>}
        </Box>
        {responseMessage && <GpToast message={responseMessage} />}
      </NavBar>
    </>
  );
};

export default Cart;
