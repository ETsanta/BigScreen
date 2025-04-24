import { useState, useRef, useEffect, useMemo } from "react";
import "@/css/index.css";
import markerImage from "@/assets/images/D2.png";
import ImageMarker from "@/components/Points";

const App = () => {
  const points = [
    { x: 800, y: 200, color: '#ff0000', data: { name: '设备A', state:1 } },
    { x: 300, y: 1500, color: '#00ff00', data: { name: '设备B', state:1 } },
    { x: 300, y: 1150, color: '#00ff00', data: { name: '设备C', state:2 } },
    { x: 300, y: 1250, color: '#00ff00', data: { name: '设备D', state:1 } }
  ];

  return (
    <div style={{ width: '18vw', height: '32vw' }}>
      <ImageMarker
        image={markerImage}
        points={points}
        tooltip={(point) => (
          <div style={{ maxWidth: 200, color:point.color }}>
            <h2 style={{ color:point.color }}>{point.data.name}</h2>
            <p>状态：({point.data.state == 1 ? '在线' : '离线'})</p>
            <p>坐标：({point.x}, {point.y})</p>
          </div>
        )}
      />
    </div>
  );
};

export default App;
