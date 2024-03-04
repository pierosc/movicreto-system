import React, { useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";

function Pagination({
  settings,
  data,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
}) {
  useEffect(() => {
    setPage(0);
  }, [data?.data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      sx={{
        backgroundColor: settings?.pagination?.color
          ? settings?.pagination?.color
          : "white",
        color: settings?.pagination?.labelColor
          ? settings?.pagination?.labelColor
          : "rgba(0, 0, 0, 0.87)",
      }}
      labelRowsPerPage={settings?.pagination?.label}
      rowsPerPageOptions={
        settings?.pagination?.rowsPerPageOptions
          ? settings?.pagination?.rowsPerPageOptions
          : [5, 10, 25]
      }
      component="div"
      count={data?.data.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

export default Pagination;
