import React, { useState } from "react";
import Line from "@/components/Line";


interface DeviceContext {
  axis: string[];
  data: number[][];
}

interface Device {
  name: string;
  list: DeviceContext[];
  time: string[];
}
const pageThree = ({ ListData = [] }: { ListData: Device[] }) => {
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
            <Line chartData={ListData[9 + index]} key={9 + index} height="20vh" width="30vw" />
          ))}
        </div>
      </div>
    </>
  )
};


export default pageThree;