import React, { useRef } from "react";
import TableCell from "@mui/material/TableCell";
import editIcon from "./Edit.json";
import AnimatedIconButton from "../../AnimatedIconButton/AnimatedIconButton";

function EditColum({ row, table }) {
  return (
    <TableCell align={"center"} padding={"none"}>
      <AnimatedIconButton
        disabled={table.editDisabled(row)}
        onClick={() => {
          table.onEditClick(row);
        }}
        JSONIcon={editIcon}
        inSegments={[0, 14]}
        outSegments={[14, 39]}
      />
    </TableCell>
  );
}

export default EditColum;
