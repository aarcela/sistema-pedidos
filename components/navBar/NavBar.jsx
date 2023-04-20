import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {
  Badge,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import Image from "next/image";
import { Home, Logout, ShoppingCart, ViewList } from "@mui/icons-material";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase/firebaseConfig";
// import { query, collection, getDocs, where } from "firebase/firestore";
import GpButton from "../gp-button/GpButton";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/actionTypes";
import { signOut } from "firebase/auth";
import { roles } from "../../types/roles";

export default function NavBar({ children }) {
  
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState([])
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart);
  const userData = useSelector((state) => state.user);
  const [menu, setMenu] = React.useState([])

  const logOut = () => {
    dispatch(removeUser())
    signOut(auth)
    router.push("/login");
  };

  React.useEffect(() => {
    const menuAdmin = [
      {
        name: "Inicio",
        link: "dashboard",
      },
      {
        name: "Catálogo",
        link: "dashboard",
      },
      {
        name: "Pedidos",
        link: "orders",
      },
      {
        name: "Usuarios",
        link: "users",
      },
    ];
    const menuClient = [
      {
        name: "Inicio",
        link: "dashboard",
      },
      {
        name: "Catálogo",
        link: "dashboard",
      },
      {
        name: "Pedidos",
        link: "orders",
      },
    ];
    setUser(userData.user[0]);
    console.log(user)
    user?.roles === roles.admin
      ? setMenu(menuAdmin)
      : setMenu(menuClient);
  },[userData, user]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  const navigateTo = (navigation) => {
    const page = navigation.toLowerCase();
    router.push(`/${page}`);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            flexGrow: 1,
            backgroundColor: "#E7E7E7",
            color: "#091A5D",
            width: `calc(100% - 240px)`,
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <GpButton
              clickFunction={() => navigateTo("cart")}
              icon={
                <Badge badgeContent={data.length} color="secondary">
                  <ShoppingCart />
                </Badge>
              }
              text={"Carrito"}
            ></GpButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          variant="permanent"
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#091A5D",
              color: "white",
              height: "100vh",
              overflowX: "hidden",
              paddingTop: "1rem",
              textAlign: "center",
              width: 250,
            }}
            role="presentation"
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
              {menu.map((element, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => navigateTo(element.link)}>
                    <ListItemIcon>
                      {index === 0 && <Home sx={{ color: "white" }} />}
                      {index === 1 && <ViewList sx={{ color: "white" }} />}
                      {index === 2 && <ShoppingCart sx={{ color: "white" }} />}
                      {index === 3 && (
                        <AccountBoxIcon sx={{ color: "white" }} />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={element.name} />
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
                <ListItemText
                  primary="Cerrar sesión"
                  sx={{ color: "#EC2139" }}
                />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, mt: 3, width: "80%" }}>
          {children}
        </Box>
      </Box>
    </>
  );
}
