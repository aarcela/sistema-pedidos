import React from "react";
import GpTable from "../../components/gp-table/GpTable";
import NavBar from "../../components/navBar/NavBar";

const Users = () => {
  const columns = [
    {
      field: "CodCliente",
      description: "Código Cliente",
      headerName: "Código Cliente",
      sortable: false,
      flex: 1,
      headerClassName: "primary-bg",
    },
    {
      field: "Nombre",
      description: "Nombre cliente",
      headerName: "Nombre",
      sortable: false,
      flex: 1,
      headerClassName: "primary-bg",
      // width: 70,
    },
  ];

  const [clientList, setClientList] = React.useState([]);

  React.useEffect(() => {
    const fetchUsersList = async () => {
      const headers = {};
      const options = {
        method: "GET",
        mode: "cors",
        headers: headers,
      };

      const res = await fetch("http://38.170.153.244:50000/cliente/clientes", options);
      const data = await res.json();
      data.map((row) => {
        row.CodArticulo = row.CodCliente;
      });
      setClientList(data);
    };

    fetchUsersList();
  }, [clientList]);

  return (
    <>
      <NavBar>
        <GpTable columns={columns} data={clientList} title="Listado de Clientes"></GpTable>
      </NavBar>
    </>
  );
};

export default Users;
