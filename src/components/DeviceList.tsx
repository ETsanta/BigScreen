import React, { useRef, useState, useEffect } from "react";
import DeviceImg from "@/assets/images/device.png"
import "@/css/DeviceList.less"
import classNames from 'classnames';
import styles from "@/css/AlertLight.module.less";
import StatusDot from "@/components/Status";


const DeviceList = ( { Data={} } ) => {
    const scale = 0.8;
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(0);
    const [tableData, setTableData] = useState({
        percent: 50,
        runTime: 500,
        lights: [{
            name: "温度",
            status: 1,
        }, {
            name: "振动",
            status: 0,
        }],
        name: "冲呀1",
        checked: 1
    })

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
                <div className="device-name">{tableData.name}</div>
                <img src={DeviceImg} alt={tableData.name} width={width + 'px'} height={height + 'px'} />
                <div className="run-bar">
                    <div style={{
                        gap: "0.5vw",
                        display: "flex",
                        flex: 0.9,
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                        <span className="device-item">运行状态</span>
                        <StatusDot status={tableData.checked == 0}></StatusDot>
                    </div>
                </div>
                <div className="device-runTime"><span className="device-item">运行时间</span><span className="device-runTime-time">{tableData.runTime}min</span></div>
                <div className="sensor-list">
                    {
                        tableData.lights.map((item, index) => <WarnLight key={index} name={item.name} status={item.status} />)
                    }
                </div>
            </div >
        </>
    )
};

export default DeviceList;