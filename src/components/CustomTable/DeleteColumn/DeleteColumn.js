import React, { useState, useRef } from "react";
import TableCell from "@mui/material/TableCell";
import trashIcon from "./trash.json";
import AnimatedIconButton from "../../AnimatedIconButton/AnimatedIconButton";

function DeleteColumn({ row, table }) {
  return (
    <TableCell align={"center"} padding={"none"}>
      <AnimatedIconButton
        disabled={table.deleteDisabled(row)}
        onClick={() => {
          table.onDeleteClick(row);
        }}
        JSONIcon={trashIcon}
        inSegments={[0, 36]}
        outSegments={[36, 76]}
      />
    </TableCell>
  );
}

export default DeleteColumn;
