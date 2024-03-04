import React, { useContext } from "react";
import TableCell from "@mui/material/TableCell";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import TableContext from "../TableContext";

function CustomCheckbox({ row, index, table }) {
  const { settings, data, selected, setSelected } = useContext(TableContext);

  const handleClick = (event, name, index) => {
    let newSelected = [];

    if (settings?.selectionType == "single") {
      newSelected = newSelected.concat(name);
    } else if (settings?.selectionType == "singleObject") {
      newSelected = name;
    } else if (settings?.selectionType == "singleToggle") {
      newSelected = JSON.stringify(selected).includes(JSON.stringify(name))
        ? []
        : newSelected.concat(name);
    } else if (settings?.selectionType == "multi") {
      if (JSON.stringify(selected).includes(JSON.stringify(name))) {
        let index = selected.findIndex((object) => {
          return object[data?.dataKey] === name[data?.dataKey];
        });
        newSelected = selected
          .slice(0, index)
          .concat(selected.slice(index + 1, selected.length + 1));
      } else {
        newSelected = newSelected.concat(selected, name);
      }
    }

    setSelected(newSelected);
  };

  return (
    <TableCell padding="checkbox">
      <ThemeProvider
        theme={createTheme({
          palette: {
            neutral: {
              main: settings?.body?.labelSelectedColor
                ? settings?.body?.labelSelectedColor
                : "#1976d2",
            },
          },
        })}
      >
        {!settings?.body?.checkboxType ||
        settings?.body?.checkboxType == "checkbox" ||
        settings?.body?.checkboxType != "radio" ? (
          <Checkbox
            color="neutral"
            checked={table.isItemSelected(row)}
            sx={{
              color: settings?.body?.labelColor
                ? settings?.body?.labelColor
                : "rgba(0, 0, 0, 0.87)",
            }}
            onClick={
              settings?.body?.editColumn || settings?.body?.deleteColumn
                ? (event) => {
                    handleClick(event, row, index);
                  }
                : () => {}
            }
          />
        ) : (
          <Radio
            color="neutral"
            checked={table.isItemSelected(row)}
            sx={{
              color: settings?.body?.labelColor
                ? settings?.body?.labelColor
                : "rgba(0, 0, 0, 0.87)",
            }}
            onClick={
              settings?.body?.editColumn || settings?.body?.deleteColumn
                ? (event) => {
                    handleClick(event, row, index);
                  }
                : () => {}
            }
          />
        )}
      </ThemeProvider>
    </TableCell>
  );
}

export default CustomCheckbox;
