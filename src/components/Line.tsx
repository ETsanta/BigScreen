import React, { useRef, useState, useEffect } from "react";
import useECharts from "@/unitls/useEcharts";
import { cloneDeep } from "lodash-es";


const BarChartComponent = ({
  option = {},
  chartData = {},
  height = "87vh",
  width = "100vw",
}) => {
  const containerRef = useRef(null);
  const colorList = ["#0060b9", "#00dcd3", "#ffffff", "#01bf74", "#f3229f", "#e2f917", "#d701e3", "#ef6815"];
  const [options] = useState({
    title: {
      text: "",
      left: 0,
      top: 0,
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [],
      axisLine: {
        symbol: 'none',
        lineStyle: {
          color: '#B4C0CC',
        },
      },
      axisTick: {
        show: false,
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: [],
      icon: 'circle',
      textStyle: {
        color: '#C6D1DB',
      },

      show: true,
    },
    yAxis: {
      type: "value",
      showSymbol: false,
      axisLine: {
        symbol: 'none',
        lineStyle: {
          color: '#B4C0CC',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.12)',
          type: 'dashed',
        },
      },
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '15%',
      top: '15%',
    },
    series: [
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
    // {
    //   data: [],
    //   name: "振动X",
    //   type: "line",
    //   smooth: true,
    //   showSymbol: false,
    //   color: colorList[0],
    //   lineStyle: {
    //     color: colorList[0],
    //     width: 2,
    //   },
    // }

    
    // if (chartData) {
    //   options.xAxis.data = chartData.time;
    //   options.series[0].data = chartData.vibrate;
    //   options.series[1].data = chartData.electricity;
    //   options.series[2].data = chartData.temperature;
    // }
    // setOptions(options);
  }
  useEffect(() => {
    initChart();
  }, [chartData, height, width, option]);
  return <div ref={containerRef} style={{ width: width, height: height }} />;
};

export default BarChartComponent;
