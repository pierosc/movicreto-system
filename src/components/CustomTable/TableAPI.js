import { useContext, useState } from "react";
import { groupByFields } from "../../utils/groupBy";
import TableContext from "./TableContext";

function TableAPI() {
  const {
    settings,
    data,
    selected,
    order,
    orderBy,
    filteredData,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
  } = useContext(TableContext);

  const hasToolBar = () => settings?.toolbar;
  const hasHeader = settings?.header;
  const hasPagination = () => settings?.pagination;
  const hasEditColumn = () => settings?.body?.editColumn;
  const hasDeleteColumn = () => settings?.body?.deleteColumn;
  const elevation = settings?.elevation ?? 0;
  const hasCheckBox = settings?.body?.checkbox;
  const isGrouped = data?.groupByFields?.length > 0;

  const sortedData = stableSort(filteredData);

  const sliceByPage = (data) =>
    data.slice(
      hasPagination() ? page * rowsPerPage : 0,
      hasPagination() ? page * rowsPerPage + rowsPerPage : filteredData?.length
    );

  // *************************
  const functionColumns = settings?.body?.functionColumns;

  const groupedData = isGrouped
    ? groupByFields(data?.data ?? [], data?.groupByFields)
    : [];

  const isItemSelected = (row) =>
    JSON.stringify(selected).includes(JSON.stringify(row));

  // *************************
  // ********* CELL **********
  // *************************
  // cell
  // categoricValue
  // value

  // const cellData = (row, rowIndex) =>
  //   data?.replaceCell ? (
  //     <div style={{ height: "100%", width: "100%" }}>
  //       {data?.replaceCell({
  //         cell: row[data.id],
  //         row: row,
  //         isItemSelected: isItemSelected,
  //         rowIndex: rowIndex,
  //       })}
  //     </div>
  //   ) : data?.replaceData?.[row[data.id]] ? (
  //     data?.replaceData?.[row[data.id]]
  //   ) : (
  //     row[data.id]
  //   );

  // *************************
  // ****** EDIT COLUMN ******
  // *************************
  const editSettings = settings?.body?.editColumn;

  const editDisabled = (row) =>
    editSettings?.disabled === "function"
      ? editSettings?.disabled(row)
      : editSettings?.disabled;

  const onEditClick = (row) => {
    // handleEditSelection(row);
    if (editSettings?.function) {
      editSettings?.function(row);
    }
  };

  // *************************
  // ***** DELETE COLUMN *****
  // *************************
  const deleteSettings = settings?.body?.deleteColumn;

  const deleteDisabled = (row) =>
    deleteSettings?.disabled === "function"
      ? deleteSettings?.disabled(row)
      : deleteSettings?.disabled;

  const onDeleteClick = (row) => {
    // handleEditSelection(row);
    if (deleteSettings?.function) {
      deleteSettings?.function(row);
    }
  };

  // *************************
  // *** SORTING FUNCTIONS ***
  // *************************

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array) {
    const comparator = getComparator(order, orderBy); // you can add comparator as a parameter
    const stabilizedThis = array?.map?.((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
  }

  // stableSort(filteredData)

  //STYLE
  //header

  const headerBackgroundColor = settings?.header?.color ?? "rgb(48,142,33)";
  const headerLabelColor = settings?.header?.labelColor ?? "rgb(255,255,255)";
  const headerStyle = {
    row: { backgroundColor: headerBackgroundColor },
    checkboxCell: { backgroundColor: headerBackgroundColor },
    checkbox: { color: headerLabelColor },
    cell: { backgroundColor: headerBackgroundColor },
    label: { color: headerLabelColor },
  };

  //PROPERTIES

  return {
    //DATA
    // dataArray,
    sliceByPage,
    //
    functionColumns,
    elevation,
    hasCheckBox,
    hasToolBar,
    hasEditColumn,
    hasDeleteColumn,
    hasHeader,
    hasPagination,
    isGrouped,
    groupedData,
    isItemSelected,
    //EDIT COLUMN
    editDisabled,
    onEditClick,
    //DELETE COLUMN
    deleteDisabled,
    onDeleteClick,
    //SORTING
    stableSort,
    //STYLE
    //header
    headerStyle,
    headerBackgroundColor,
  };
}

export default TableAPI;
