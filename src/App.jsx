import { useState, useRef, useEffect } from "react";
// import './App.css'
import "@/css/index.css";
import iconImg from "@/assets/images/dev-list-header-title-icon2.png";
import ProgressBar from "@/components/Progress";
import "@/css/Progress.less";
import PageOne from "@/components/PageOne";
import PageTwo from "@/components/PageTwo";
import PageThree from "@/components/PageThree";
import { getPage1, getPage2, getPage3 } from "@/api/api";
import { message } from "antd";

function App() {
  const [page, setPage] = useState(1);
  const [deviceList, setDeviceList] = useState([]);
  const [runRate, setRunRate] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // 保存最新的回调函数
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // 设置定时器
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const timer = setInterval(tick, delay);
        return () => clearInterval(timer);
      }
    }, [delay]);
  }
  useInterval(() => {
    setPage(page == 3 ? 1 : page + 1);
    switch (page + 1) {
      case 1:
        getPage1()
          .then((res) => {})
          .finally(() => {
            if (res && res["deviceList"] && res["runRate"]) {
              const res = {
                deviceList: [
                  {
                    name: "设备1",
                    status: 1, // 0是关 1是开
                    runTime: "500", //单位小时 || 分钟，
                    sensorStatus: [
                      {
                        name: "温振1",
                        status: 1, // 0是开 1是关
                      },
                      {
                        name: "温振2",
                        status: 1, // 0是开 1是关
                      },
                      {
                        name: "电流",
                        status: 1, // 0是开 1是关
                      },
                    ],
                  },
                  {
                    name: "设备2",
                    status: 1, // 0是关 1是开
                    runTime: "500", //单位小时 || 分钟，
                    sensorStatus: [
                      {
                        name: "温振1",
                        status: 1, // 0是开 1是关
                      },
                      {
                        name: "温振2",
                        status: 1, // 0是开 1是关
                      },
                      {
                        name: "电流",
                        status: 1, // 0是开 1是关
                      },
                    ],
                  },
                ],
                runRate: 80,
              };
              setDeviceList(res.deviceList);
              setRunRate(res.runRate);
            } else {
              Toast.error("数据获取失败");
            }
          });
        break;
      case 2:
        getPage2()
          .then((res) => {})
          .finally(() => {});
        break;
      case 3:
        getPage3()
          .then((res) => {})
          .finally(() => {});
        break;
      default:
        break;
    }
  }, 3000);
  return (
    <>
      {contextHolder}
      <div className="dev-list-area">
        <div className="dev-list-header"></div>
        <div className="dev-list-header-title">
          <div className="dev-list-header-title-icon">
            <img src={iconImg} alt="" />
          </div>
          <div className="dev-list-header-title-text">
            {page == 1
              ? "设备基本信息"
              : page == 2
              ? "设备温振记录"
              : "设备电流记录"}
          </div>
          <div className="progress-bar-Div">
            <ProgressBar percentage={runRate} context={"开动率"}></ProgressBar>
          </div>
        </div>

        {page == 1 ? <PageOne /> : page === 2 ? <PageTwo /> : <PageThree />}
      </div>
    </>
  );
}

export default App;
