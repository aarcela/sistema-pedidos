import Head from "next/head";
import Login from "./login";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sistema de Pedidos</title>
        <meta
          name="description"
          content="Sistema de pedidos para clientes del Grupo Puma"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  );
}
