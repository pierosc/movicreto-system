import * as React from "react";
import "./Styles/Styles.css";
import DibuTable from "./Table";
import TableAPI from "./TableAPI";
import { TableContextProvider } from "./TableContext";
//**************************************************************************
//********************************* ORDER **********************************

function CustomTable({
  settings = { header: [{}], body: [{}] },
  data,
  selected = "",
  setSelected = () => {},
  setDeleteSelected,
  setEditSelected,
  loading = false,
}) {
  return (
    <TableContextProvider
      settings={settings}
      data={data}
      selected={selected}
      setSelected={setSelected}
      setDeleteSelected={setDeleteSelected}
      setEditSelected={setEditSelected}
      loading={loading}
    >
      <DibuTable />
    </TableContextProvider>
  );
}

export default CustomTable;
