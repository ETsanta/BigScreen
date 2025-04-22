import React, {useState} from "react";
import DeviceList from "@/components/DeviceList";

const pageOne = () => {
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
                        gap: "1vw",
                        justifyContent: "space-evenly",
                    }}
                >
                    <DeviceList />
                    <DeviceList />
                    <DeviceList />
                    <DeviceList />
                    <DeviceList />
                </div>
            </div>
        </>
    )
};


export default pageOne;