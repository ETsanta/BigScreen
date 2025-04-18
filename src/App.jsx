import { useState } from "react";
// import './App.css'
import Line from "@/components/Line";
import DeviceList from "@/components/DeviceList";
import { random } from "lodash";
import "tdesign-react/es/style/index.css";
import "@/css/index.css";
import iconImg from "@/assets/images/dev-list-header-title-icon2.png"

function App() {
  const [ChartData, setChartData] = useState({
    vibrate: [11, 1, 2, 3, 4, 5],
    electricity: [1, 12, 22, 3, 4, 5],
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
  return (
    <>
      <div className="dev-list-area">
        <div className="dev-list-header"></div>
        <div className="dev-list-header-title">
          <div className="dev-list-header-title-icon">
            <img src={iconImg} alt="" />
          </div>
          <div className="dev-list-header-title-text">设备基本信息</div>
          
        </div>
        <div className="dev-list">
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "space-evenly",
            }}
          >
            <DeviceList />
            <DeviceList />
            <DeviceList />
            <DeviceList />
            <DeviceList />
            <DeviceList />
            <DeviceList />
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "space-evenly",
            }}
          >
            <DeviceList />
            <DeviceList />
            <DeviceList />
            <DeviceList />
            <DeviceList />
            <DeviceList />
          </div>
        </div>
      </div>
      {/* <Line chartData={ChartData} />
      <button onClick={changeData}>换</button> */}
    </>
  );
}

export default App;
