import * as React from "react";
import { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import CustomHeader from "./CustomHeader/CustomHeader";
import Checkbox from "./Checkbox/Checkbox";
import Cell from "./Cell/Cell";
import EditColum from "./EditColumn/EditColum";
import DeleteColumn from "./DeleteColumn/DeleteColumn";
import Pagination from "./Pagination/Pagination";
import EmptyRows from "./EmptyRows/EmptyRows";
import Loader from "./Loader/Loader";
import { Row } from "./Row/Row";
import Toolbar from "./Toolbar/Toolbar";
import FilterGroup from "../FilterGroup/FilterGroup";
import CustomColumn from "./CustomColumn/CustomColumn";
import TableStyles from "./Styles/Styles";
import "./Styles/Styles.css";
import TableAPI from "./TableAPI";
import TableContext from "./TableContext";

function DibuTable() {
  const {
    settings,
    data,
    // table,
    selected,
    setSelected,
    setDeleteSelected,
    setEditSelected,
    loading,
    page,
    setPage,
    filteredData,
    setFilteredData,
    rowsPerPage,
    setRowsPerPage,
  } = useContext(TableContext);

  const table = TableAPI();

  // const [filteredData, setFilteredData] = useState(data?.data);

  const tableStyle = TableStyles(settings);

  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(
  //   settings?.pagination?.rowsPerPageOptions
  //     ? settings?.pagination?.rowsPerPageOptions[0]
  //     : 5
  // );

  return (
    <div className="flex flex-col">
      <FilterGroup />
      <Box sx={{ width: "100%", borderRadius: "10px" }}>
        <Paper
          elevation={table.elevation}
          sx={{ width: "100%", borderRadius: "10px" }}
        >
          {table.hasToolBar() && (
            <Toolbar
              numSelected={selected?.length}
              toolbar={settings?.toolbar ? settings?.toolbar : []}
              data={data}
              settings={settings}
            />
          )}
          <div
            className="table-scroll overflow-auto"
            style={{
              maxHeight: settings?.height ? settings?.height : "100%",
              borderTopLeftRadius: settings?.toolbar ? "0px" : "10px",
              borderTopRightRadius: settings?.toolbar ? "0px" : "10px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <Table
              stickyHeader
              size={
                settings?.dense === "small"
                  ? "small"
                  : settings?.dense === "medium" && "medium"
              }
            >
              {/* //***************************************************************************
            //**************************** HEADER & TOOLBAR ***************************** */}

              {/* {table.hasHeader && ( */}
              <CustomHeader
                numSelected={selected?.length}
                rowCount={filteredData?.length}
                filteredData={filteredData}
                table={table}
              />
              {/* )} */}

              {/* //***************************************************************************
            //********************************** BODY *********************************** */}

              <TableBody>
                {loading ? (
                  <Loader data={data} />
                ) : (
                  table
                    .sliceByPage(table.stableSort(filteredData))
                    .map((row, index) => {
                      return (
                        <Row
                          key={index}
                          row={row}
                          table={table}
                          index={index}
                          tableStyle={tableStyle}
                        >
                          {table.hasCheckBox && (
                            <Checkbox row={row} index={index} table={table} />
                          )}
                          {/* //***************************************************************************
                       //********************************** ROWS *********************************** */}
                          {data?.header.map((data, cellIndex) => {
                            return (
                              <Cell
                                table={table}
                                row={row}
                                data={data}
                                tableStyle={tableStyle}
                                rowIndex={index}
                              />
                            );
                          })}
                          {/* //***************************************************************************
                        //********************************** FUNCTIONS *********************************** */}
                          {table.functionColumns?.map((columnData, index) => {
                            return (
                              <CustomColumn
                                table={table}
                                key={index}
                                columnData={columnData}
                                settings={settings}
                                row={row}
                                setEditSelected={setEditSelected}
                                tableStyle={tableStyle}
                              />
                            );
                          })}
                          {/* //***************************************************************************
                        //********************************** EDIT *********************************** */}
                          {table.hasEditColumn() && (
                            <EditColum row={row} table={table} />
                          )}
                          {/* //***************************************************************************
                       //********************************* DELETE ********************************** */}
                          {table.hasDeleteColumn() && (
                            <DeleteColumn row={row} table={table} />
                          )}
                        </Row>
                      );
                    })
                )}
                <EmptyRows
                  settings={settings}
                  data={data}
                  rowsPerPage={rowsPerPage}
                  page={page}
                />
              </TableBody>
              {/* </TableContainer> */}
            </Table>
          </div>

          {/* //***************************************************************************
        //******************************* PAGINATION ******************************** */}

          {settings?.pagination && (
            <Pagination
              settings={settings}
              data={data}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              page={page}
              setPage={setPage}
            />
          )}
        </Paper>
      </Box>
    </div>
  );
}

export default DibuTable;
