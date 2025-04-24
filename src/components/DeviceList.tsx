import React, { useRef, useState, useEffect } from "react";
import DeviceImg from "@/assets/images/device.png"
import D2 from "@/assets/images/D2.png"
import D3 from "@/assets/images/D3.png"
import "@/css/DeviceList.less"
import classNames from 'classnames';
import styles from "@/css/AlertLight.module.less";
import StatusDot from "@/components/Status";
import ImageMarker from "@/components/Points";
import { use } from "react";


interface SensorStatusItem {
    name: string;
    status: 0 | 1; // 0表示关，1表示开
}

interface Device {
    name: string;
    type: string;
    status: 0 | 1; // 0表示关，1表示开
    runTime: string;
    sensorStatus: SensorStatusItem[];
}
const DeviceList = ({ Data = {
    name: "",
    type: "0",
    status: 0, // 0是关 1是开
    runTime: "", //单位小时 || 分钟，
    sensorStatus: [
    ],
}, }: {
    Data: Device
}) => {
    const scale = 0.8;
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(0);
    const [points1, setPoints1] = useState([
        { x: 800, y: 350, color: '', code: "温振1" },
        { x: 300, y: 600, color: '', code: "温振2" },
        { x: 600, y: 700, color: '', code: "电流" },
    ]);
    const [points2, setPoints2] = useState([
        { x: 800, y: 200, color: '', code: "温振1" },
        { x: 300, y: 400, color: '', code: "温振2" },
        { x: 1000, y: 700, color: '', code: "电流" },
    ]);
    const [points3, setPoints3] = useState([
        { x: 800, y: 500, color: '', code: "温振1" },
        { x: 300, y: 600, color: '', code: "温振2" },
        { x: 650, y: 1200, color: '', code: "电流" },
    ]);

    const AlertLight = ({ status = 0, size = 1, colorMap = { 0: '#05e348', 1: '#e20202' } }) => {
        return (
            <div
                className={classNames(styles.light, {
                    [styles.alert]: status === 1,  // 当 status=1 时添加 alert 类名
                })}
                style={{
                    '--light-size': `${size}vw`,     // 动态控制尺寸
                    '--normal-color': colorMap[0],    // 默认状态颜色
                    '--alert-color': colorMap[1],     // 告警状态颜色
                } as React.CSSProperties}
            />
        );
    };

    const WarnLight = ({ name = "", status = 0, }) => {
        return (
            <>
                <div className="device-warnLight">
                    <AlertLight status={status} />
                    <div className="device-item">{name}</div>
                </div>
            </>
        );
    }
    function convertVhToPx() {
        // 假设要转换的 vh 值
        const vWValue = 6.25;
        // 获取视口高度
        const viewportWidth = window.innerWidth;
        // 计算对应的 px 值
        const pxValue = (vWValue / 100) * viewportWidth;
        setWidth(pxValue);
        setHeight(pxValue / scale);
    }
    function handleResize() {
        convertVhToPx()
    }
    function handlePoints() {
        let param = []
        Data.sensorStatus.map((item, index) => {
            switch (Data.type) {
                case "0":
                    points1.map((itemChild, index) => {
                        if (itemChild.code == item.name) {
                            points1[index].color = item.status == 0 ? '#05e348' : '#e20202'
                            param.push(points1[index])
                        } else {
                            param.push(itemChild)
                        }
                    })
                    setPoints1(param)
                    break;
                case "1":
                    points2.map((itemChild, index) => {
                        if (itemChild.code == item.name) {
                            points2[index].color = item.status == 0 ? '#05e348' : '#e20202'
                            param.push(points2[index])
                        } else {
                            param.push(itemChild)
                        }
                    })
                    setPoints2(param)
                    break;
                case "2":
                    points3.map((itemChild, index) => {
                        if (itemChild.code == item.name) {
                            points3[index].color = item.status == 0 ? '#05e348' : '#e20202'
                            param.push(points3[index])
                        } else {
                            param.push(itemChild)
                        }
                    })
                    setPoints3(param)
                    break;
                default:
                    break;
            }
        })
    }
    window.addEventListener('resize', handleResize);
    useEffect(() => {
        handlePoints()
    }, [Data])
    useEffect(() => {
        convertVhToPx();
    }, []);
    return (
        <>
            <div className="device-list">
                <div className="device-name">{Data.name}</div>
                <div style={{ width: width + 'px', height: height + 'px' }}>
                    {/* <img src={D2} alt={Data.name} width={width + 'px'} height={height + 'px'} /> : <img src={D3} alt={Data.name} width={width + 'px'} height={height + 'px'} /> */}
                    <ImageMarker
                        image={Data.type == "0" ? DeviceImg : Data.type == "1" ? D2 : D3}
                        points={Data.type == "0" ? points1 : Data.type == "1" ? points2 : points3}
                        tooltip={(point) => (
                            <div style={{ maxWidth: 200, color: point.color }}>
                                <h2 style={{ color: point.color }}>{point.data.name}</h2>
                                <p>状态：({point.data.state == 1 ? '在线' : '离线'})</p>
                                <p>坐标：({point.x}, {point.y})</p>
                            </div>
                        )}
                    />
                </div>
                <div className="run-bar">
                    <div style={{
                        gap: "0.5vw",
                        display: "flex",
                        flex: 0.9,
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                        <span className="device-item">运行状态</span>
                        <StatusDot status={Data.status == 0}></StatusDot>
                    </div>
                </div>
                <div className="device-runTime"><span className="device-item">运行时间</span><span className="device-runTime-time">{Data.runTime}min</span></div>
                <div className="sensor-list">
                    {
                        Data.sensorStatus.map((item, index) => <WarnLight key={index} name={item.name} status={item.status} />)
                    }
                </div>
            </div >
        </>
    )
};

export default DeviceList;