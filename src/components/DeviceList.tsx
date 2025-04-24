import React, { useRef, useState, useEffect } from "react";
import DeviceImg from "@/assets/images/device.png"
import D2 from "@/assets/images/D2.png"
import D3 from "@/assets/images/D3.png"
import "@/css/DeviceList.less"
import classNames from 'classnames';
import styles from "@/css/AlertLight.module.less";
import StatusDot from "@/components/Status";

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

    window.addEventListener('resize', handleResize);

    useEffect(() => {
        convertVhToPx();
    }, []);
    return (
        <>
            <div className="device-list">
                <div className="device-name">{Data.name}</div>
                {Data.type == "1" ? <img src={DeviceImg} alt={Data.name} width={width + 'px'} height={height + 'px'} />
                 : Data.type == "2" ?
                  <img src={D2} alt={Data.name} width={width + 'px'} height={height + 'px'} /> :  <img src={D3} alt={Data.name} width={width + 'px'} height={height + 'px'} />

                }
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