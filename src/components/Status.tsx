import React, { useState, useEffect } from "react";


const Status = ({ status = true, width = "1vw", height = "0.5vw", }) => {

    return (
        <>
            <div style={{ width: width, height: height, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ "backgroundColor": status ? "#c8090b" : "#05e348", width: "100%", height: "100%" }}></div>
            </div >
        </>
    )
}

export default Status;