import React, { useContext } from "react";
import TableRow from "@mui/material/TableRow";
import TableContext from "../TableContext";

export const Row = ({ row, table, index, children, tableStyle }) => {
  const { settings, data, selected, setSelected } = useContext(TableContext);

  const handleClick = (event, name, index) => {
    let newSelected = [];

    if (settings?.selectionType === "single") {
      newSelected = newSelected.concat(name);
    } else if (settings?.selectionType === "singleObject") {
      newSelected = name;
    } else if (settings?.selectionType === "singleToggle") {
      newSelected = JSON.stringify(selected).includes(JSON.stringify(name))
        ? []
        : newSelected.concat(name);
    } else if (settings?.selectionType === "multi") {
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
    <TableRow
      onClick={(event) => {
        if (settings?.selectionType !== "noSelection") {
          if (settings?.body?.editColumn || settings?.body?.deleteColumn) {
          } else {
            handleClick(event, row, index);
          }
        }
      }}
      role="checkbox"
      aria-checked={table.isItemSelected(row)}
      tabIndex={-1}
      key={row[data?.dataKey]}
      sx={tableStyle.rowStyle(
        table.isItemSelected(row),
        typeof settings?.body?.rowColorFilter === "function"
          ? settings?.body?.rowColorFilter(row)
          : () => {}
      )}
    >
      {children}
    </TableRow>
  );
};
