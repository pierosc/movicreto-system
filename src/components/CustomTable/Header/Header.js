import React from "react";
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

function Header({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  data,
  settings,
  toolbar,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      {settings?.toolbar ? (
        <CustomToolbar
          numSelected={numSelected}
          toolbar={toolbar}
          data={data}
          settings={settings}
        />
      ) : null}
      <TableRow
        sx={{
          backgroundColor: settings?.header?.color
            ? settings?.header?.color
            : "rgb(48,142,33)",
        }}
      >
        {/****************************************************************************
        //******************************* CHECKBOX ***********************************
        //**************************************************************************/}

        {settings?.body?.checkbox ? (
          settings?.header?.checkbox &&
          settings?.selectionType != "single" &&
          settings?.selectionType != "singleToggle" ? (
            <TableCell
              padding={
                // settings?.header?.padding
                //   ? settings?.header?.padding
                //   :
                "checkbox"
              }
              sx={{
                backgroundColor: settings?.header?.color
                  ? settings?.header?.color
                  : "rgb(48,142,33)",
              }}
            >
              <ThemeProvider
                theme={createTheme({
                  palette: {
                    neutral: {
                      main: settings?.header?.labelColor
                        ? settings?.header?.labelColor
                        : "rgb(0,0,0)",
                    },
                  },
                })}
              >
                <div className="flex items-center">
                  <Checkbox
                    sx={{
                      color: settings?.header?.labelColor
                        ? settings?.header?.labelColor
                        : "rgb(0,0,0)",
                    }}
                    color="neutral"
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                  />
                  {settings?.header?.checkboxLabel ? (
                    <Typography
                      sx={{
                        color: settings?.header?.labelColor
                          ? settings?.header?.labelColor
                          : "rgb(0,0,0)",
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
              padding={
                settings?.header?.padding
                  ? settings?.header?.padding
                  : "checkbox"
              }
              sx={{
                backgroundColor: settings?.header?.color
                  ? settings?.header?.color
                  : "rgb(48,142,33)",
              }}
            ></TableCell>
          )
        ) : null}

        {/****************************************************************************
        //******************************** TITLES ************************************
        //**************************************************************************/}

        {data?.header.map((n) => (
          <TableCell
            key={n.id}
            align={
              n.align
                ? n.align
                : settings?.header?.align
                ? settings?.header?.align
                : "center"
            }
            padding={
              n.padding
                ? n.padding
                : settings?.header?.padding
                ? settings?.header?.padding
                : "normal"
            }
            sortDirection={orderBy === n.id ? order : false}
            sx={{
              backgroundColor: settings?.header?.color
                ? settings?.header?.color
                : "rgb(48,142,33)",
            }}
          >
            {settings?.order ? (
              <TableSortLabel
                active={orderBy === n.id}
                direction={orderBy === n.id ? order : "asc"}
                onClick={createSortHandler(n.id)}
              >
                <Typography
                  sx={{
                    color: settings?.header?.labelColor
                      ? settings?.header?.labelColor
                      : "white",
                  }}
                >
                  {n.label}
                </Typography>
                {orderBy === n.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography
                sx={{
                  color: settings?.header?.labelColor
                    ? settings?.header?.labelColor
                    : "white",
                }}
              >
                {n.label}
              </Typography>
            )}
          </TableCell>
        ))}
        {settings?.body?.editColumn ? (
          <TableCell
            sx={{
              backgroundColor: settings?.header?.color
                ? settings?.header?.color
                : "rgb(48,142,33)",
            }}
          >
            <Typography
              sx={{
                color: settings?.header?.labelColor
                  ? settings?.header?.labelColor
                  : "white",
              }}
            >
              {"Editar"}
            </Typography>
          </TableCell>
        ) : null}
        {settings?.body?.deleteColumn ? (
          <TableCell
            sx={{
              backgroundColor: settings?.header?.color
                ? settings?.header?.color
                : "rgb(48,142,33)",
            }}
          >
            <Typography
              sx={{
                color: settings?.header?.labelColor
                  ? settings?.header?.labelColor
                  : "white",
              }}
            >
              {"Editar"}
            </Typography>
          </TableCell>
        ) : null}
      </TableRow>
    </TableHead>
  );
}

export default Header;
