import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

function Chart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
        {
          data: [3, 4.5, 4, 2.5, 5.5, 8],
        },
      ]}
      width={500}
      height={300}
    />
  );
}

export default Chart;
