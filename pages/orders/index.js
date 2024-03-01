import { DataGrid } from "@mui/x-data-grid";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import GpButton from "../../components/gp-button/GpButton";
import GpModal from "../../components/gp-modal/GpModal";
import GpTable from "../../components/gp-table/GpTable";
import NavBar from "../../components/navBar/NavBar";
import { useSelector } from "react-redux";
import { roles } from "../../types/roles";
import GpToast from "../../components/gp-toast/GpToast";

const Orders = () => {
  const [modalData, setModalData] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const userData = useSelector((state) => state.user);
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      headerClassName: "primary-bg",
      sortable: false,
      flex: 0.7,
    },
    {
      field: "fact_num",
      headerName: "Factura",
      headerClassName: "primary-bg",
      sortable: false,
      flex: 0.5,
    },
    {
      field: "cliente",
      headerName: "Cliente",
      sortable: false,
      flex: 1,
      headerClassName: "primary-bg",
      // width: 70,
    },
    {
      field: "vendedor",
      sortable: false,
      headerName: "Vendedor",
      flex: 1,
      headerClassName: "primary-bg",
    },
    {
      field: "estatus_profit",
      sortable: false,
      headerName: "Status",
      flex: 0.5,
      headerClassName: "primary-bg",
    },
    {
      field: "subtotal",
      sortable: false,
      headerName: "Subtotal",
      flex: 0.5,
      headerClassName: "primary-bg",
    },
    {
      field: "anulado",
      sortable: false,
      headerName: "Anulado",
      flex: 0.5,
      headerClassName: "primary-bg",
      renderCell: (cellValues) => {
        return cellValues.row.value ? (
          <GpButton text="Sí" bgColor="#48D98A" />
        ) : (
          <GpButton text="No" bgColor="#EC2139" />
        );
      },
    },
  ];

  const showModal = (data) => {
    setModalData(data);
    setIsOpen(true);
  };

  React.useEffect(() => {
    const fetchOrders = async () => {
      const ordersUrl = "";
      const headers = {};
      const options = {
        method: "GET",
        mode: "cors",
        headers: headers,
      };

      if (!userData?.user[0]?.roles) {
        setMessage("Ha ocurrido un error, por favor ingrese nuevamente");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        return;
      }
      userData?.user[0]?.roles === roles.admin
        ? (ordersUrl = "pedidototales")
        : (ordersUrl = `pedidosporcliente?codCliente=${userData?.user[0]?.co_cli}&status=0`);
      // ? setOrdersUrl(`pedidostotales`)
      // : setOrdersUrl(
      //     `pedidosporcliente?codCliente=${userData?.user[0]?.co_cli}&status=0`
      //   );
      if (!ordersUrl) return;
      const res = await fetch(
        `http://intelinet.com.ve:8090/apigrupopuma/pedido/${ordersUrl}`,
        // `http://intelinet.com.ve:8090/apigrupopuma/pedido/pedidosporcliente?codCliente=200042362 &status=0`,
        options
      );
      if (!data) {
        setMessage("Ha ocurrido un error, por favor ingrese nuevamente");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <NavBar>
        {/* <DataGrid rows={orders} columns={columns} sx={{ marginTop: "5rem" }} /> */}
        {orders.length !== 0 && (
          <GpTable title="Pedidos" data={orders} columns={columns} clickFunction={(data) => showModal(data)}></GpTable>
        )}
      </NavBar>
      {isOpen && <GpModal isOpen={isOpen} modalData={modalData} />}
      {message !== "" && <GpToast message={message} />}
    </>
  );
};

export default Orders;
