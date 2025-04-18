import React,{ useRef, useState, useEffect } from "react";
import useECharts from "@/unitls/useEcharts";
import { cloneDeep } from "lodash-es";
const BarChartComponent = ({
  option = {},
  chartData = {},
  height = "100vh",
  width = "100vw",
}) => {
  const containerRef = useRef(null);
  const colorList = ["#0060b9", "#00dcd3", "#ffffff"];
  const [options] = useState({
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [],
        type: "line",
        lineStyle: {
          color: colorList[0],
          width: 2,
        },
      },
      {
        data: [],
        type: "line",
        lineStyle: {
          color: colorList[1],
          width: 2,
        },
      },
      {
        data: [],
        type: "line",
        lineStyle: {
          color: colorList[2],
          width: 2,
        },
      },
    ],
  });

  const { resizeChart, setOptions } = useECharts({
    container: containerRef,
    options,
    resize: true,
  });

  function initChart() {
    if (option) {
      Object.assign(options, cloneDeep(option));
    }
    if (chartData) {
      options.xAxis.data = chartData.time;
      options.series[0].data = chartData.vibrate;
      options.series[1].data = chartData.electricity;
      options.series[2].data = chartData.temperature;
    }
    setOptions(options);
  }
  useEffect(() => {
    
    initChart();
  }, [chartData, height, width, option]);
  return <div ref={containerRef} style={{ width: width, height: height }} />;
};

export default BarChartComponent;
