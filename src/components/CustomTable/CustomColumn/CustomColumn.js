import React from "react";
import TableCell from "@mui/material/TableCell";
// import { labelColor } from "../Styles/Styles";
import IconButton from "@mui/material/IconButton";

function CustomColumn({
  columnData,
  settings,
  row,
  table,
  setEditSelected,
  tableStyle,
}) {
  const cellStyle = {
    color: table.isItemSelected(row)
      ? tableStyle.labelColor("selected", settings)
      : tableStyle.labelColor("normal", settings),
    "&:hover": {
      color: table.isItemSelected(row)
        ? tableStyle.labelColor("selected-hover", settings)
        : tableStyle.labelColor("hover", settings),
    },
    height: 0,
  };

  return (
    <TableCell align={"center"} padding={"none"} sx={cellStyle}>
      {columnData?.replaceCell ? (
        <div style={{ height: "100%", width: "100%" }}>
          {columnData?.replaceCell({
            row: row,
            isItemSelected: table.isItemSelected(row),
          })}
        </div>
      ) : (
        <IconButton
          disabled={columnData?.disabled}
          onClick={() => {
            columnData.function(row);
          }}
          sx={{
            color: table.isItemSelected(row)
              ? tableStyle.labelColor("selected", settings)
              : tableStyle.labelColor("normal", settings),
          }}
        >
          {columnData.icon}
        </IconButton>
      )}
    </TableCell>
  );
}

export default CustomColumn;
