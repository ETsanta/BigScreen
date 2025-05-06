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
  const [page, setPage] = useState(2);
  const [deviceList, setDeviceList] = useState([]);
  const [runRate, setRunRate] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [ListData1, setListData1] = useState([]);
  const [ListData2, setListData2] = useState([]);

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
  function page1() {
    getPage1()
      .then((res) => {
        if (res.data && res.data["device_list"] && res.data["run_rate"]) {
          setDeviceList(res.data.device_list);
          setRunRate(res.data.run_rate);
        } else {
          Toast.error("数据获取失败");
        }
      })
      .finally(() => {});
  }
  // 定义一个名为 page2 的函数
  function page2() {
    // 调用 getPage2 函数，该函数返回一个 Promise 对象
    getPage2().then((res) => {
      // 当 Promise 对象成功解析时，执行回调函数
      // 回调函数接收一个参数 res，代表从 getPage2 返回的响应数据
      // 将响应数据中的 data 属性赋值给 setListData1 函数，更新组件的状态
      setListData1(res.data);
    });
  }

  function page3() {
    getPage3().then((res) => {
      setListData2(res.data);
    });
  }
  function initInterval() {
    useInterval(() => {
      let param = page == 3 ? 1 : page + 1;
      setPage(param);
      switch (param) {
        case 1:
          page1();
          break;
        case 2:
          page2();
          break;
        case 3:
          page3();
          break;
        default:
          messageApi.error("系统异常");
          break;
      }
    }, 15000);
  }
  useEffect(() => {
    page2();
  }, []);

  // initInterval();

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

        {page == 1 ? (
          <PageOne listData={deviceList} />
        ) : page === 2 ? (
          <PageTwo ListData={ListData1} />
        ) : (
          <PageThree ListData={ListData2} />
        )}
      </div>
    </>
  );
}

export default App;
