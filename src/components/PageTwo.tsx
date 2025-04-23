import React, { useState } from "react";
import Line from "@/components/Line";
import { random } from "lodash";


interface DeviceContext {
  axis: string[];
  data: number[][];
}

interface Device {
  name: string;
  list: DeviceContext[];
  time: string[];
}
const pageTwo = ({ ListData = [] }: { ListData: Device[] }) => {
  const [ChartData, setChartData] = useState({
    vibrate: [11, 1, 2, 22, 3, 15],
    electricity: [1, 12, 22, 3, 24, 35],
    temperature: [1, 11, 42, 23, 14, 15],
    time: ["09:10", "10:10", "11:10", "12:10", "13:10", "14:10"],
  });
  return (
    <>
      <div className="dev-list">
        <div className="dev-list-chart">
          {Array.from({ length: 3 }).map((_, index) => (
            <Line chartData={ListData[index]} key={index} height="20vh" width="30vw" />
          ))}
        </div>
        <div className="dev-list-chart">
          {Array.from({ length: 3 }).map((_, index) => (
            <Line chartData={ListData[3 + index]} key={3 + index} height="20vh" width="30vw" />
          ))}
        </div>
        <div className="dev-list-chart">
          {Array.from({ length: 3 }).map((_, index) => (
            <Line chartData={ListData[6 + index]} key={6 + index} height="20vh" width="30vw" />
          ))}
        </div>
        <div className="dev-list-chart">
          {Array.from({ length: 2 }).map((_, index) => (
            <Line chartData={ListData[9 + index]} key={9 + index} height="20vh" width="46vw" />
          ))}
        </div>
      </div>
    </>
  )
};


export default pageTwo;