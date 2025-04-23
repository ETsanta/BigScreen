import React, { useRef, useState, useEffect } from "react";
import useECharts from "@/unitls/useEcharts";
import { cloneDeep } from "lodash-es";


interface DeviceContext {
  axis: string[];
  data: number[][];
}
interface Device {
  name: string;
  list: DeviceContext[];
  time: string[];
}

const BarChartComponent = ({
  option = {},
  chartData = {
    name: "",
    list: [],
    time: [],
  },
  height = "87vh",
  width = "100vw",
}: { option?: any, chartData: Device, height?: string, width?: string }) => {
  const containerRef = useRef(null);
  const colorList = ["#0060b9", "#00dcd3", "#ffffff", "#01bf74", "#f3229f", "#e2f917", "#d701e3", "#ef6815"];
  const [options, setOption] = useState({
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
      itemWidth: 5,
      itemHeight: 5,
      left: 50,
      textStyle: {
        color: '#C6D1DB',
        fontSize: 10,
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

    let seriesParam = []
    let flag = 0
    let legend = []
    for (let i = 0; i < chartData.list.length; i++) {
      const element = chartData.list[i];
      for (let j = 0; j < element.axis.length; j++) {
        const childName = element.axis[j];
        const childData = element.data[j];
        legend.push(element.name + "-" + childName);
        let param = {
          data: childData,
          name: element.name + "-" + childName,
          type: "line",
          smooth: true,
          showSymbol: false,
          color: colorList[flag],
          markPoint: {
            showSymbol: true,
            symbolSize: 0,
            symbol: "circle",
            symbolOffset: [0, 0],
            label: {
              borderRadius: 200,
              distance: 1,
              formatter: [
                '    {d|●}',
                ' {a|{c}}',
                '    {b|}'
              ].join(''),
              rich: {
                d: {
                  color: 'inherit',
                },
                a: {
                  color: '#fff',
                  align: 'center',
                },
              }

            },

            data: [
              {
                type: 'max',
                name: '最大值',
              },
            ],
          },
          lineStyle: {
            color: colorList[flag],
            width: 2,
          },
        }
        flag++
        seriesParam.push(param);
      }

    }
    setOption(prev => ({
      ...prev,
      title: {
        ...prev.title,
        text: chartData.name  // 修改 title.text
      },
      legend: {
        ...prev.legend,
        data: legend // 修改 legend.data
      },
      xAxis: {
        ...prev.xAxis,
        data: chartData.time // 修改 xAxis.data
      },
      series: seriesParam
    }));

  }
  useEffect(() => {
    initChart();
  }, [chartData, height, width]);

  useEffect(() => {
    setOptions(options);
  }, [options]);
  return <div ref={containerRef} style={{ width: width, height: height }} />;
};

export default BarChartComponent;
