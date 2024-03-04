import React from "react";
import CustomTable from "../components/CustomTable/CustomTable";

function DataTable({ dataFromExcel }) {
  const data = {
    header: [
      {
        label: "NOMBRE DE OPERADOR",
        id: "1. NOMBRE DE OPERADOR",
        filterType: "select",
      },
      {
        label: "FECHA",
        id: "2. FECHA",
      },
      {
        label: "# PARTE MIXER",
        id: "3. # PARTE MIXER",
      },
      {
        label: "VOL (M3)",
        id: "12. VOL (M3)",
        filterType: "number",
      },
      {
        label: "KG DE CEMENTO",
        id: "13. KG DE CEMENTO",
        filterType: "number",
      },
      {
        label: "TIPO DE CEMENTO",
        id: "14. TIPO DE CEMENTO",
      },
      {
        label: "KILOS DE ARENA",
        id: "15. KILOS DE ARENA",
        filterType: "number",
      },
      {
        label: "KILOS DE PIEDRA",
        id: "16. KILOS DE PIEDRA",
        filterType: "number",
      },
      {
        label: "LITROS DE AGUA",
        id: "17. LITROS DE AGUA",
        filterType: "number",
      },
    ],
    data: dataFromExcel,
  };

  const settings = {
    pagination: {
      color: "grey",
      labelColor: "white",
      label: "Filas por página",
      rowsPerPageOptions: [7, 11, 30, 40],
    },
  };

  return <CustomTable data={data} />;
}

export default DataTable;
