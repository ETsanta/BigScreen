import React, { useState } from "react";
import DeviceList from "@/components/DeviceList";

const pageOne = ({ listData = [] }) => {
    listData
    return (
        <>
            <div className="dev-list">
                <div
                    style={{
                        display: "flex",
                        gap: "1vw",
                        justifyContent: "space-evenly",
                    }}
                >

                    {Array.from({ length: 6 }).map((_, index) => (
                        <DeviceList key={index} Data={listData[index]} />
                    ))}
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "1vw",
                        justifyContent: "space-evenly",
                    }}
                >
                    {Array.from({ length: 5 }).map((_, index) => (
                        <DeviceList key={6 + index} Data={listData[6 + index]} />
                    ))}
                </div>
            </div>
        </>
    )
};


export default pageOne;