import React, { useState } from "react";
import Line from "@/components/Line";
import { random } from "lodash";

const pageTwo = () => {
    const [ChartData, setChartData] = useState({
        vibrate: [11, 1, 2, 22, 3, 15],
        electricity: [1, 12, 22, 3, 24, 35],
        temperature: [1, 11, 42, 23, 14, 15],
        time: ["09:10", "10:10", "11:10", "12:10", "13:10", "14:10"],
    });
    const changeData = () => {
        setChartData({
          vibrate: [
            random(1, 100),
            random(1, 100),
            random(1, 100),
            random(1, 100),
            random(1, 100),
            random(1, 100),
          ],
          electricity: [
            random(1, 100),
            random(1, 100),
            random(1, 100),
            random(1, 100),
            random(1, 100),
            random(1, 100),
          ],
          temperature: [
            random(1, 100),
            random(1, 100),
            random(1, 100),
            random(1, 100),
            random(1, 100),
            random(1, 100),
          ],
          time: ["09:10", "10:10", "11:10", "12:10", "13:10", "14:10"],
        });
      };
    {/* <button onClick={changeData}>换</button> */ }
    return (
        <>
            <div className="dev-list">
                <div className="dev-list-chart">
                    <Line chartData={ChartData} height="20vh" width="30vw" />
                    <Line chartData={ChartData} height="20vh" width="30vw" />
                    <Line chartData={ChartData} height="20vh" width="30vw" />
                </div>
                <div className="dev-list-chart">
                    <Line chartData={ChartData} height="20vh" width="30vw" />
                    <Line chartData={ChartData} height="20vh" width="30vw" />
                    <Line chartData={ChartData} height="20vh" width="30vw" />
                </div>
                <div className="dev-list-chart">
                    <Line chartData={ChartData} height="20vh" width="30vw" />
                    <Line chartData={ChartData} height="20vh" width="30vw" />
                    <Line chartData={ChartData} height="20vh" width="30vw" />
                </div>
                <div className="dev-list-chart">
                    <Line chartData={ChartData} height="20vh" width="30vw" />
                    <Line chartData={ChartData} height="20vh" width="30vw" />
                </div>
            </div>
        </>
    )
};


export default pageTwo;