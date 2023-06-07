import React, { useState } from "react";

import { auth, db } from "../../firebase/firebaseConfig";
import {
  useAuthState,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import { useRouter } from "next/router";
import Image from "next/image";

import { Box, Button, TextField, Typography, Card } from "@mui/material";
import styles from "../../styles/Login.module.css";
import Loader from "../../components/loader/Loader";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actionTypes";
import { roles } from "../../types/roles";

const Admin = () => {
  const [user, error] = useAuthState(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch()

  const passwordRecovery = async () => {
    setIsError("");
    setIsLoading(false);
    email
      ? await (sendPasswordResetEmail(email), alert("Correo enviado"))
      : setIsError("Introduce un Correo");
  };

  const handleLogin = () => {
    setIsError("");
    if (email && password) {
      setIsLoading(true);
      try{
        signInWithEmailAndPassword(email, password)
        user && fetchUserData(user)
        return
      }
      catch(error){
        setIsError('Error intentando ingresar')
      }
      finally{
        setIsLoading(false)
      }
      return;
    }
    setIsLoading(false);
    return;
  };

  const fetchUserData = async (user) => {
    try {
      const q = await query(
        collection(db, "users"),
        where("uid", "==", user?.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      data.roles = roles.admin
      dispatch(addUser(data))
      router.push("/dashboard");
    } catch (err) {
      setIsError("Error intentando ingresar");
    }
    finally{
      setIsLoading(false)
    }
  };

  React.useEffect(() => {
    !user && setIsLoading(false);
    user && fetchUserData(user);
  }, [user, router]);

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
          portal de Admin
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
              <Typography
                variant="h6"
                color="#EC2139"
                component="strong"
                sx={{ marginTop: "2rem" }}
              >
                {isError}
              </Typography>
            )}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Admin;
