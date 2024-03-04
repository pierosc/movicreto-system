import React, { useContext } from "react";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { visuallyHidden } from "@mui/utils";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import CustomToolbar from "../CustomToolbar/CustomToolbar";
import { IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableContext from "../TableContext";

function CustomHeader({ numSelected, rowCount, filteredData, table }) {
  const {
    settings,
    data,
    selected,
    setSelected,
    order,
    orderBy,
    setOrder,
    setOrderBy,
  } = useContext(TableContext);

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const backgroundColor = settings?.header?.color ?? "rgb(48,142,33)";
  const labelColor = settings?.header?.labelColor ?? "rgb(255,255,255)";
  const headerStyle = {
    row: { backgroundColor: backgroundColor },
    checkboxCell: { backgroundColor: backgroundColor },
    checkbox: { color: labelColor },
    cell: { backgroundColor: backgroundColor },
    label: { color: labelColor },
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // const newSelected = data?.data.map((n) => n);
      const newSelected = filteredData?.map((n) => n);

      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <TableHead>
      <TableRow sx={headerStyle.row}>
        {/****************************************************************************
        //******************************* CHECKBOX ***********************************
        //**************************************************************************/}
        {settings?.body?.checkbox ? (
          settings?.header?.checkbox &&
          settings?.selectionType != "single" &&
          settings?.selectionType != "singleToggle" ? (
            <TableCell padding={"checkbox"} sx={headerStyle.checkboxCell}>
              <ThemeProvider
                theme={createTheme({
                  palette: {
                    neutral: {
                      main: labelColor,
                    },
                  },
                })}
              >
                <div className="flex items-center">
                  <Checkbox
                    sx={headerStyle.checkbox}
                    color="neutral"
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={handleSelectAllClick}
                  />
                  {settings?.header?.checkboxLabel ? (
                    <Typography
                      sx={{
                        color: labelColor,
                      }}
                    >
                      {settings?.header?.checkboxLabel}
                    </Typography>
                  ) : null}
                </div>
              </ThemeProvider>
            </TableCell>
          ) : (
            <TableCell
              padding={settings?.header?.padding ?? "checkbox"}
              sx={{
                backgroundColor: backgroundColor,
              }}
            ></TableCell>
          )
        ) : null}
        {/****************************************************************************
        //******************************** TITLES ************************************
        //**************************************************************************/}
        {data?.header?.map((n, index) => (
          <TableCell
            key={n.id ?? index}
            align={n.align ?? settings?.header?.align ?? "center"}
            padding={n.padding ?? settings?.header?.padding ?? "normal"}
            sortDirection={orderBy === n.id ? order : false}
            sx={headerStyle.cell}
          >
            {settings?.order ? (
              <TableSortLabel
                active={orderBy === n.id}
                direction={orderBy === n.id ? order : "asc"}
                onClick={createSortHandler(n.id)}
              >
                <Typography sx={headerStyle.label}>{n.label}</Typography>
                {orderBy === n.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <Tooltip title={n?.tooltip}>
                <Typography sx={headerStyle.label}>{n.label}</Typography>
              </Tooltip>
            )}
          </TableCell>
        ))}
        {/****************************************************************************
        //******************************** FUNCTION COLUMNS ************************************
        //**************************************************************************/}
        {settings?.body?.functionColumns?.map((columnData, index) => (
          <TableCell align={"center"} key={index} sx={headerStyle.cell}>
            <Typography sx={headerStyle.label}>{columnData.label}</Typography>
          </TableCell>
        ))}

        {table.hasEditColumn() && (
          <TableCell align={"center"} sx={headerStyle.cell}>
            <Typography sx={headerStyle.label}>{"Editar"}</Typography>
          </TableCell>
        )}
        {table.hasDeleteColumn() && (
          <TableCell align={"center"} sx={headerStyle.cell}>
            <Typography sx={headerStyle.label}>{"Eliminar"}</Typography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

export default CustomHeader;
