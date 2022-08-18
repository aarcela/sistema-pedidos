import React from "react";
import NavBar from "../../components/navBar/NavBar";
import GpTable from "../../components/gp-table/GpTable";
import GpButton from "../../components/gp-button/GpButton";

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
    flex: 1,
    headerClassName: "primary-bg",
  },
  {
    field: "Disponible",
    sortable: false,
    headerName: "Disponibilidad",
    flex: 1,
    type: "number",
    headerClassName: "primary-bg",
  },
  {
    field: "add",
    sortable: false,
    headerName: "Acciones",
    flex: 1,
    headerClassName: "primary-bg",
    renderCell: (cellValues) => {
      return (
        <GpButton
          text="Añadir"
          clickFunction={(event) => addToCart(event, cellValues)}
        />
      );
    },
  },
];

// export async function getServerSideProps() {

//     const res = await fetch(`${process.env.NEXT_PROFIT_API_URL}/inventario`);
//     const data = await res.json();
//     return { props: { data } };

// }
const addToCart = (e, cell) => {
  console.log("Clickec", cell);
};

const Dashboard = () => {
  const [inventory, setInventory] = React.useState([]);

  React.useEffect(() => {
    const fetchInventory = async () => {
      const options = {
        method: "GET",
        mode: "no-cors",
      };
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_PROFIT_API_URL}/inventario`
      // );
      const res = await fetch(
        `https://intelinet.com.ve:444/apigrupopuma/inventario`,
        options
      );
      const data = await res.json();
      // data.map((row) => {
      //   row.add = "Añadir";
      // });
      setInventory(data);
    };

    fetchInventory();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <GpTable columns={columns} data={inventory}></GpTable>
    </>
  );
};

export default Dashboard;
