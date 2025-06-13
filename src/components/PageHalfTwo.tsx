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
const structure = [3, 3]
const pageTwo = ({ ListData = [] }: { ListData: Device[] }) => {
    return (
        <>
            <div className="dev-list">
                {structure.map((item, SuperIndex) => (
                    <div className="dev-list-chart" key={"list" + SuperIndex}>
                        {Array.from({ length: item }).map((_, index) => (
                            <Line chartData={ListData[SuperIndex ? structure[SuperIndex - 1] : 0 + index]} key={"map" + index} height="40vh" width="32vw" />
                        ))}
                    </div>
                )
                )
                }
            </div>
        </>
    )
};


export default pageTwo;