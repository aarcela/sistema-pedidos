import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import Image from "next/image";
import { Home, Logout, ShoppingCart, ViewList } from "@mui/icons-material";

import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase/firebaseConfig";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NavBar() {
  const router = useRouter();

  const [user] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [roles, setRoles] = React.useState([]);
  const logOut = () => {
    signOut(auth);
    router.push("/login");
  };

  React.useEffect(() => {
    fetchUserName(user);
  }, [user]);

  const fetchUserName = async (user) => {
    try {
      const q = await query(
        collection(db, "users"),
        where("uid", "==", user?.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log("User", data);
      setName(data.name);
      setRoles(data.roles);
    } catch (err) {
      console.error(err);
      setName("");
      // alert("An error occured while fetching user data");
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: "#E7E7E7" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Button color="inherit">
              Carrito {open} - {name} {roles?.isAdmin ? "Admin" : "Cliente"}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            backgroundColor: "#091A5D",
            color: "white",
            height: "100vh",
            textAlign: "center",
            width: 250,
            paddingTop: "1rem",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Image
            sx={{ marginBottom: "1rem", marginTop: "1rem" }}
            src="/images/logo.png"
            alt="logo"
            width="197"
            height="81"
          />
          <Typography variant="h6" fontWeight="lighter">
            Menu
          </Typography>
          <List>
            {["Inicio", "Catágolo", "Pedidos"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <Home sx={{ color: "white" }} />}
                    {index === 1 && <ViewList sx={{ color: "white" }} />}
                    {index === 2 && <ShoppingCart sx={{ color: "white" }} />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItemButton
              sx={{ backgroundColor: "#081148" }}
              onClick={logOut}
            >
              <ListItemIcon>
                <Logout sx={{ color: "#EC2139" }} />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" sx={{ color: "#EC2139" }} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
