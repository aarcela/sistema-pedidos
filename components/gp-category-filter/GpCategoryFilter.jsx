import React from "react";
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
export const GpCategoryFilter = ({ handleSubcategoryChange, handleSearch }) => {
  const mockData = [
    {
      id: 1,
      linea: "LUBRICANTES IMPORTADOS",
      sublinea: ["ROSHFRANS", "UNO"],
    },
    {
      id: 2,
      linea: "BUJIAS",
      sublinea: ["CHECK"],
    },
    {
      id: 3,
      linea: "Filtros",
      sublinea: [
        "AIRE",
        "GASOLINA",
        "ACEITE",
        "ACEITE INDUSTRIAL",
        "COMBUSTIBLE INDUSTRIAL",
        "AIRE INDUSTRIAL",
      ],
    },
    {
      id: 4,
      linea: "SCHUMACHER",
      sublinea: ["SCHUMACHER"],
    },
    {
      id: 5,
      linea: "PILAS",
      sublinea: ["CHECK"],
    },
    {
      id: 6,
      linea: "BATERIA MOTO",
      sublinea: ["CHECK"],
    },
    {
      id: 7,
      linea: "RODAMIENTOS",
      sublinea: ["CHECK"],
    },
    {
      id: 8,
      linea: "MODULOS GASOLINA",
      sublinea: ["CHECK"],
    },
    {
      id: 9,
      linea: "BATERIAS",
      sublinea: ["CHECK"],
    },
    {
      id: 9,
      linea: "CEPILLO LIMPIAPARABRISAS",
      sublinea: ["CEPILLO"],
    },
    {
      id: 10,
      linea: "CAUCHOS MOTOS",
      sublinea: ["CHECK"],
    },
    {
      id: 11,
      linea: "GLADIATOR",
      sublinea: ["CAR CARE"],
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [optionSubcategory, setoptionSubcategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [searchbar, setSearchbar] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategory("");

    const filteredData = mockData.filter(
      (item) => item.linea === event.target.value
    );
    setoptionSubcategory(filteredData[0].sublinea);
  };

  return (
    <Box
      sx={{
        width: "95%",
        borderRadius: "0",
        margin: "2rem auto",
      }}
    >
      <FormControl sx={{ minWidth: 170, marginRight: "1rem" }}>
        <InputLabel id="category-select">Categoría</InputLabel>
        <Select
          labelId="category-select"
          label="Categoría"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {mockData.map((item) => (
            <MenuItem key={item.id} value={item.linea}>
              {item.linea}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedCategory && (
        <FormControl sx={{ minWidth: 170, marginRight: "1rem" }}>
          <InputLabel id="subcategory-select">Subcategoría</InputLabel>
          <Select
            labelId="subcategory-select"
            label="Subcategoría"
            value={selectedSubCategory}
            onChange={(value) => {
              handleSubcategoryChange(value);
              setSelectedSubCategory(value.target.value);
            }}
          >
            {optionSubcategory.map((item, key) => (
              <MenuItem key={key} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <FormControl sx={{ minWidth: 170, margin: "auto" }}>
        <TextField
          id="outlined-basic"
          label="Búqueda por código"
          value={searchbar}
          onChange={(value) => {
            handleSearch(value);
            setSearchbar(value.target.value);
          }}
        ></TextField>
      </FormControl>
    </Box>
  );
};
