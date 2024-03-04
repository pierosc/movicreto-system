import React from "react";

export default function TableStyles(settings) {
  const bodySettings = settings?.body;
  //LABEL COLOR ON BODY CELL'S
  const labelColor = (status, settings) => {
    switch (status) {
      case "selected":
        return settings?.body?.labelSelectedColor
          ? settings?.body?.labelSelectedColor
          : "rgba(0, 0, 0, 0.87)";
      case "normal":
        return settings?.body?.labelColor
          ? settings?.body?.labelColor
          : "rgba(0, 0, 0, 0.87)";
      case "selected-hover":
        return settings?.body?.labelSelectedHoverColor
          ? settings?.body?.labelSelectedHoverColor
          : settings?.body?.labelSelectedColor
          ? settings?.body?.labelSelectedColor
          : "rgba(0, 0, 0, 0.87)";
      case "hover":
        return settings?.body?.labelHoverColor
          ? settings?.body?.labelHoverColor
          : settings?.body?.labelColor
          ? settings?.body?.labelColor
          : "rgba(0, 0, 0, 0.87)";
      default:
        return "white";
    }
  };

  //ROW STYLES

  const rowColor = (status) => {
    if (status) {
      return bodySettings?.rowSelectedColor
        ? bodySettings?.rowSelectedColor
        : "rgba(25, 118, 210, 0.08)"; //COLOR DE FILA SELECCIONADA POR DEFECTO
    } else {
      return bodySettings?.rowColor
        ? bodySettings?.rowColor
        : "rgb(255,255,255)"; //COLOR DE FILA POR DEFECTO
    }
    // switch (status) {
    //   case "selected":
    //     return bodySettings?.rowSelectedColor
    //       ? bodySettings?.rowSelectedColor
    //       : "rgba(25, 118, 210, 0.08)"; //COLOR DE FILA SELECCIONADA POR DEFECTO
    //   case "normal":
    //     return bodySettings?.rowColor
    //       ? bodySettings?.rowColor
    //       : "rgb(255,255,255)"; //COLOR DE FILA POR DEFECTO
    //   default:
    //     return "white";
    // }
  };

  const hover = (rgbColor) => {
    const oppacity = 15;
    const rgbColorValue = rgbColor.split("(")?.[1].split(")")?.[0].split(",");
    const isrgba = rgbColor.split("(")?.[0].includes("a");
    const transparency = isrgba ? Number(rgbColorValue[3]) : 1;
    const redColor = Number(rgbColorValue[0]) - oppacity;
    const greenColor = Number(rgbColorValue[1]) - oppacity;
    const blueColor = Number(rgbColorValue[2]) - oppacity;
    return (
      "rgba(" +
      redColor +
      "," +
      greenColor +
      "," +
      blueColor +
      "," +
      transparency +
      ")"
    );
  };

  const rowStyle = (isItemSelected, rowColorFilter) => {
    // console.log(rowColorFilter);
    // console.log(rowColorFilter?.backgroundColor);
    // console.log(rowColorFilter?.backgroundColor?.backgroundColor);
    return {
      backgroundColor:
        rowColorFilter.backgroundColor &&
        rowColorFilter.backgroundColor !== "default"
          ? rowColorFilter.backgroundColor
          : rowColor(isItemSelected),
      // display: "table",
      // tableLayout: "fixed",
      // width: "100%",
      "&:hover": {
        backgroundColor:
          settings?.selectionType !== "noSelection"
            ? rowColorFilter.backgroundColor &&
              rowColorFilter.backgroundColor !== "default"
              ? hover(rowColorFilter.backgroundColor)
              : hover(rowColor(isItemSelected))
            : rowColor(isItemSelected),

        cursor:
          settings?.selectionType !== "noSelection"
            ? !bodySettings?.editColumn && !bodySettings?.deleteColumn
              ? "pointer"
              : "auto"
            : "auto",
      },
    };
  };

  const TableContainerStyler = {
    maxHeight: settings?.height ? settings?.height : "100%",
    borderTopLeftRadius: settings?.toolbar ? "0px" : "10px",
    borderTopRightRadius: settings?.toolbar ? "0px" : "10px",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  };

  return { rowColor, labelColor, rowStyle };
}
