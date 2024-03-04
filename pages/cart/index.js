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
        return cellValues.row.Precio * cellValues.row.quantity;
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
  const userData = useSelector((state) => state.user);
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

    const subTotal = cart?.cart?.map((item) => parseFloat(item.subTotal)).reduce((a, b) => a + b, 0);

    const cartPedido = cart?.cart?.map((element) => {
      return {
        CodProducto: element.CodArticulo,
        Precio: element.Precio,
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
      subTotal: subTotal,
      total: subTotal,
      rif: userData?.user[0]?.rif ? userData?.user[0]?.rif : '"J-000"',
      PedidoDetalle: cartPedido,
    };

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
