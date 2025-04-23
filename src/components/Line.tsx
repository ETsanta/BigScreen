import React, { useRef, useState, useEffect, useCallback } from "react";
import useECharts from "@/unitls/useEcharts";
import { cloneDeep } from "lodash-es";
import { useDeepCompareEffect } from 'ahooks'; 


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

  const initChart = useCallback(() => {
    setOption(prevOptions => {
      // 深拷贝当前配置并合并传入的option
      const newOptions = cloneDeep(prevOptions);
      if (option) {
        Object.assign(newOptions, cloneDeep(option));
      }

      // 生成series和legend逻辑
      let seriesParam = [];
      let flag = 0;
      let legend = [];
      for (const element of chartData.list) {
        for (let j = 0; j < element.axis.length; j++) {
          const childName = element.axis[j];
          const childData = element.data[j];
          legend.push(element.name + "-" + childName);
          let join = (j % 2) == 0 ? [
            ' {a|{c}}',
            '{d|●}'
          ].join('') : [
            '  {d|●}',
            '  {a|{c}}'
          ].join('');
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
              label: {
                borderRadius: 200,
                formatter: join,
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

      // 更新配置项
      newOptions.title.text = chartData.name;
      newOptions.legend.data = legend;
      newOptions.xAxis.data = chartData.time;
      newOptions.series = seriesParam;

      return newOptions;
    });
  }, [option, chartData, colorList]);
  useDeepCompareEffect(() => {
    initChart();
  }, [chartData, height, width]);

  return <div ref={containerRef} style={{ width: width, height: height }} />;
};

export default BarChartComponent;
