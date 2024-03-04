import React, { useState } from "react";
import "./App.css";
import ExcelToJson from "./pages/ExcelToJson";
import DataTable from "./pages/DataTable";
import Chart from "./pages/Chart";

function App() {
  const [data, setData] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <ExcelToJson setData={setData} />
        <Chart />
        <div style={{ overflow: "auto", maxHeight: "60vh" }}>
          <DataTable dataFromExcel={data} />
        </div>
      </header>
      {/* <ExcelToJson /> */}
    </div>
  );
}

export default App;
