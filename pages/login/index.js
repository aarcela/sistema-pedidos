import React, { useState } from "react";

import { auth } from "../../firebase/firebaseConfig";
import {
  useAuthState,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import { useRouter } from "next/router";
import Image from "next/image";

import { Box, Button, TextField, Typography, Card } from "@mui/material";
import styles from "../../styles/Login.module.css";
import { signOut } from "firebase/auth";

const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const router = useRouter();

  if (error) {
    console.log(error);
    setIsError(error.message);
  }
  // if (loading) {
  //   setIsLoading(true);
  // }

  const passwordRecovery = async () => {
    setIsError("");
    email
      ? await (sendPasswordResetEmail(email), alert("Correo enviado"))
      : setIsError("Introduce un Correo");
  };

  React.useEffect(() => {
    user && router.push("/dashboard");
  }, [user, router]);

  return (
    <Box className={styles.main_container}>
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
        <Typography variant="h4" component="strong">
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
              name="email"
              type="email"
              placeholder="Email"
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

            {!isLoading ? (
              <Button
                sx={{
                  backgroundColor: "#061241",
                  color: "white",
                  marginBotton: "2rem",
                }}
                aria-label="SignIn"
                onClick={() => signInWithEmailAndPassword(email, password)}
              >
                Iniciar Sesión
              </Button>
            ) : (
              <p>Loading...</p>
            )}
            {isError && <p>{isError}</p>}
            <Typography
              variant="span"
              color="#EC2139"
              onClick={passwordRecovery}
            >
              Recuperar Contraseña
            </Typography>
          </Box>
        </Card>
        <Typography
          variant="h6"
          color="#505050"
          fontWeight="lighter"
          sx={{ marginTop: "2rem" }}
        >
          ¿Desea formar parte de nuestros distribuidores?
        </Typography>
        <Typography variant="h6" color="#505050">
          Escribanos a ventas@grupopuma.com.ve
        </Typography>
      </Box>
      {/* {error} */}
    </Box>
  );
};

export default Login;
