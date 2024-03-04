import React, { useState, useRef, useContext } from "react";
import TableCell from "@mui/material/TableCell";
import TableContext from "../TableContext";

function Cell({ row, table, data, tableStyle, rowIndex }) {
  const { settings } = useContext(TableContext);

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

  const cellAlign = data?.dataAlign
    ? data?.dataAlign
    : settings?.body?.align
    ? settings?.body?.align
    : "center";

  const cellPadding = settings?.body?.padding
    ? settings?.body?.padding
    : data?.replaceCell
    ? "none"
    : "normal";

  return (
    <TableCell
      // key={index}
      align={cellAlign}
      padding={cellPadding}
      sx={cellStyle}
      // rowSpan={2}
    >
      {data?.replaceCell ? (
        <div style={{ height: "100%", width: "100%" }}>
          {data?.replaceCell({
            cell: row[data.id],
            row: row,
            isItemSelected: table.isItemSelected(row),
            rowIndex: rowIndex,
          })}
        </div>
      ) : data?.replaceData?.[row[data.id]] ? (
        data?.replaceData?.[row[data.id]]
      ) : (
        row[data.id]
      )}
    </TableCell>
  );
}

export default Cell;
