import { useState, useRef, useEffect } from "react";
// import './App.css'
import "@/css/index.css";
import iconImg from "@/assets/images/dev-list-header-title-icon2.png";
import ProgressBar from "@/components/Progress";
import "@/css/Progress.less";
import PageOne from "@/components/PageOne";
import PageTwo from "@/components/PageTwo";
import PageThree from "@/components/PageThree";
import PageHalfTwo from "@/components/PageHalfTwo";
import { getPage1, getPage2, getPage3 } from "@/api/api";
import { message, Spin } from "antd";

function App() {
  const [page, setPage] = useState(1);
  const [deviceList, setDeviceList] = useState([]);
  const [runRate, setRunRate] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [ListData1, setListData1] = useState([]);
  const [ListData2, setListData2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copyList, setCopyList] = useState([]);

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
    setListData2([]);
    getPage1()
      .then((res) => {
        if (res.data && res.data["device_list"] && "run_rate" in res.data) {
          setDeviceList(res.data.device_list);
          setRunRate(res.data.run_rate);
        } else {
          messageApi.error("数据获取失败");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function page2() {
    setDeviceList([]);
    getPage2()
      .then((res) => {
        res.data.forEach((item) => {
          if (item.deviceType === "1") {
            let data = item.list;
            if (data) {
              const copyData = {
                name: item.name,
                list: [data[0]],
                time: data[0].time,
              };
              setCopyList((prevList) => [...prevList, copyData]);
              data.shift();
            }
          }
        });
        setListData1(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function page2V() {
    setListData1([]);
    setLoading(false);
    //TODO: 页面2.5
  }

  function page3() {
    setCopyList([]);
    getPage3()
      .then((res) => {
        setListData2(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function initInterval() {
    const time = useInterval(() => {
      setLoading(true);
      let param = page == 3 ? 1 : page == 1 ? page + 1 : page + 0.5;
      setPage(param);
      switch (param) {
        case 1:
          page1();
          break;
        case 2:
          page2();
          break;
        case 2.5:
          page2V();
          break;
        case 3:
          page3();
          break;
        default:
          messageApi.error("系统异常");
          clearInterval(time);
          break;
      }
    }, 15000);
  }
  useEffect(() => {
    page1();
  }, []);

  initInterval();

  return (
    <>
      <Spin spinning={loading} delay={500}>
        {contextHolder}
        <div className="dev-list-area">
          <div className="dev-list-header"></div>
          <div className="dev-list-header-title">
            <div className="dev-list-header-title-text">
              {page == 1
                ? "设备基本信息"
                : page == 3
                ? "设备电流记录"
                : "设备温振记录"}
            </div>
            <div className="dev-list-header-title-left">
              <div className="dev-list-header-title-icon">
                <img src={iconImg} alt="" />
              </div>
              <div className="progress-bar-Div">
                <ProgressBar
                  percentage={runRate}
                  context={"开动率"}
                ></ProgressBar>
              </div>
            </div>
          </div>

          {page == 1 ? (
            <PageOne listData={deviceList} />
          ) : page === 2 ? (
            <PageTwo ListData={ListData1} />
          ) : page === 2.5 ? (
            <PageHalfTwo ListData={copyList} />
          ) : (
            <PageThree ListData={ListData2} />
          )}
        </div>
      </Spin>
    </>
  );
}

export default App;
