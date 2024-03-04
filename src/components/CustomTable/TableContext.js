import React, { createContext, useState } from "react";

const TableContext = createContext();

function TableContextProvider({
  children,
  settings = {},
  data,
  selected,
  setSelected,
  setDeleteSelected,
  setEditSelected,
  loading,
}) {
  // SORTING
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(
    settings?.pagination?.rowsPerPageOptions
      ? settings?.pagination?.rowsPerPageOptions[0]
      : 5
  );
  // *************************
  // ********* DATA **********
  // *************************

  const dataArray = Array.isArray(data?.data) ? data?.data : [];
  const [filteredData, setFilteredData] = useState(dataArray);
  // filteredData;

  return (
    <TableContext.Provider
      value={{
        settings,
        data,
        selected,
        setSelected,
        setDeleteSelected,
        setEditSelected,
        loading,
        //DATA ARRAY VALUE
        dataArray,
        filteredData,
        setFilteredData,
        // SORTING
        order,
        setOrder,
        orderBy,
        setOrderBy,
        //FILTERING
        filteredData,
        setFilteredData,
        //PAGINATION
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export { TableContextProvider };
export default TableContext;
