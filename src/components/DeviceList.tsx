import React, { useRef, useState, useEffect } from "react";
import DeviceImg from "@/assets/images/device.png"
import D2 from "@/assets/images/D2.png"
import D3 from "@/assets/images/D3.png"
import "@/css/DeviceList.less"
import classNames from 'classnames';
import styles from "@/css/AlertLight.module.less";
import StatusDot from "@/components/Status";
import ImageMarker from "@/components/Points";


interface SensorStatusItem {
    sensor_sn: string;
    sensor_name: string;
    sensor_runstate: string;
}

interface Device {
    device_name: string;
    device_type: string;
    device_runstate: string; // 0表示关，1表示开
    device_runtime: string;
    sensor_list?: SensorStatusItem[];
    temp_sensor_infos?: SensorStatusItem[];
    elec_sensor_infos?: SensorStatusItem[];
}
const DeviceList = ({ Data = {
    device_name: "",
    device_type: "1",
    sensor_list: [],
    device_runstate: "true",
    device_runtime: "", //单位小时 || 分钟，
    temp_sensor_infos: [
    ],
    elec_sensor_infos: [
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

    const AlertLight = ({ status = "在线", size = 1, colorMap = { 0: '#05e348', 1: '#e20202' } }) => {
        return (
            <div
                className={classNames(styles.light, {
                    [styles.alert]: status != "在线",
                })}
                style={{
                    '--light-size': `${size}vw`,     // 动态控制尺寸
                    '--normal-color': colorMap[0],    // 默认状态颜色
                    '--alert-color': colorMap[1],     // 告警状态颜色
                } as React.CSSProperties}
            />
        );
    };

    const WarnLight = ({ name = "", status = "在线", }) => {
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
        let param:any = []
        Data.temp_sensor_infos?.map((item, index) => {
            switch (Data.device_type) {
                case "1":
                    points1.map((itemChild, index) => {
                        if (itemChild.code == item.sensor_sn) {
                            points1[index].color = item.sensor_runstate == "在线" ? '#05e348' : '#e20202'
                            param.push(points1[index])
                        } else {
                            param.push(itemChild)
                        }
                    })
                    setPoints1(param)
                    break;
                case "2":
                    points2.map((itemChild, index) => {
                        if (itemChild.code == item.sensor_sn) {
                            points2[index].color = item.sensor_runstate == "在线" ? '#05e348' : '#e20202'
                            param.push(points2[index])
                        } else {
                            param.push(itemChild)
                        }
                    })
                    setPoints2(param)
                    break;
                case "3":
                    points3.map((itemChild, index) => {
                        if (itemChild.code == item.sensor_sn) {
                            points3[index].color = item.sensor_runstate == "在线" ? '#05e348' : '#e20202'
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
    function comboSensor() {
        if (Data["temp_sensor_infos"] && Data["elec_sensor_infos"]) {
            Data["sensor_list"] = [...Data.temp_sensor_infos, ...Data.elec_sensor_infos]
        } else {
            Data["sensor_list"] = Data["temp_sensor_infos"] ? Data.temp_sensor_infos : Data["elec_sensor_infos"] ? Data.elec_sensor_infos : [];
        }

    }
    window.addEventListener('resize', handleResize);
    useEffect(() => {
        if (Data.device_runtime) {
            comboSensor()
            handlePoints()
        }
    }, [Data])
    useEffect(() => {
        convertVhToPx();
    }, []);
    return (
        <>
            <div className="device-list">
                <div className="device-name">{Data.device_name}</div>
                <div style={{ width: width + 'px', height: height + 'px' }}>
                    {Data.device_type == '1' ? <img src={DeviceImg} alt={Data.device_name} width={width + 'px'} height={height + 'px'} /> : Data.device_type == '2' ? <img src={D2} alt={Data.device_name} width={width + 'px'} height={height + 'px'} /> : Data.device_type == '3' ? <img src={D3} alt={Data.device_name} width={width + 'px'} height={height + 'px'} /> : <img src={DeviceImg} alt={Data.device_name} width={width + 'px'} height={height + 'px'} />}
                    {/* <ImageMarker
                        image={Data.device_type == "0" ? DeviceImg : Data.device_type == "1" ? D2 : D3}
                        points={Data.device_type == "0" ? points1 : Data.device_type == "1" ? points2 : points3}
                        tooltip={(point) => (
                            <div style={{ maxWidth: 200, color: point.color }}>
                                <h2 style={{ color: point.color }}>{point.data.name}</h2>
                                <p>状态：({point.data.state == 1 ? '在线' : '离线'})</p>
                                <p>坐标：({point.x}, {point.y})</p>
                            </div>
                        )}
                    /> */}
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
                        <StatusDot status={Data.device_runstate == "false"}></StatusDot>
                    </div>
                </div>
                <div className="device-runTime"><span className="device-item">运行时间</span><span className="device-runTime-time">{Data.device_runtime}</span></div>
                <div className="sensor-list">
                    {
                        Data.sensor_list && Data.sensor_list.map((item, index) => <WarnLight key={index} name={item.sensor_name} status={item.sensor_runstate} />)
                    }
                </div>
            </div >
        </>
    )
};

export default DeviceList;