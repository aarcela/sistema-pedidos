import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { Box, Button, TextField, Typography, Card } from "@mui/material";
import styles from "../../styles/Login.module.css";
import Loader from "../../components/loader/Loader";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actionTypes";
import { roles } from "../../types/roles";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const headers = {};
  const options = {
    method: "GET",
    mode: "cors",
    headers: headers,
  };

  const handleLogin = async () => {
    setIsError("");
    if (email && password) {
      setIsLoading(true);

      const res = await fetch(`http://38.170.153.244:50000/cliente/login?usuario=${email}&password=${password}`, options);
      try {
        const usuario = await res.json();
        console.log("Data del usuario: ", usuario);
        usuario.roles = roles.client;
        dispatch(addUser(usuario));
        router.push("/dashboard");
        return;
      } catch (error) {
        setIsError("Credenciales incorrectas");
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
    return;
  };

  const passwordRecovery = async () => {
    const res = await fetch(`http://38.170.153.244:50000/cliente/recuperarcontrasena?usuario=${email}`, options)
      .then((response) => response.text())
      .then((response) => setIsError(response));
  };

  return (
    <Box className={styles.main_container}>
      {isLoading === true && <Loader />}
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "#091A5D",
          display: "flex",
          justifyContent: "center",
          width: "40%",
        }}
      >
        <Image src="/images/logo.png" alt="logo" width="350rem" height="150" />
      </Box>
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          width: "60%",
        }}
      >
        <Typography variant="h4" color="#505050" fontWeight="lighter">
          Bienvenido a nuestro
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {" "}
          portal de ventas
        </Typography>

        <Card
          sx={{
            minWidth: "35vw",
            backgroundColor: "#091A5D",
            padding: "2.5rem",
            borderRadius: "0px",
            marginTop: "1rem",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <TextField
              name="usuario"
              type="text"
              placeholder="Usuario"
              autoComplete="off"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                border: "none",
                marginBottom: "0.5rem",
                background: "white",
              }}
            />
            <TextField
              autoComplete="false"
              name="password"
              type="password"
              placeholder="Contraseña"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                border: "none",
                marginBottom: "0.5rem",
                background: "white",
              }}
            />

            <Button
              sx={{
                backgroundColor: "#061241",
                borderRadius: "0",
                color: "white",
                marginBotton: "2rem",
              }}
              aria-label="SignIn"
              onClick={handleLogin}
            >
              Iniciar Sesión
            </Button>

            <Button
              sx={{
                backgroundColor: "#EC2139",
                borderRadius: "0",
                color: "white",
                marginBotton: "2rem",
              }}
              aria-label="SignIn"
              onClick={passwordRecovery}
            >
              Recuperar Contraseña
            </Button>
            {isError && (
              <Typography variant="h6" color="#EC2139" component="strong" sx={{ marginTop: "2rem" }}>
                {isError}
              </Typography>
            )}
          </Box>
        </Card>
        <Typography variant="h6" color="#505050" fontWeight="lighter" sx={{ marginTop: "2rem" }}>
          ¿Desea formar parte de nuestros distribuidores?
        </Typography>
        <Typography variant="h6" color="#091A5D" component="strong">
          Escribanos a ventas@grupopuma.com.ve
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
