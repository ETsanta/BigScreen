import React, { useRef, useState, useEffect, useCallback } from "react";
import useECharts from "@/uitls/useEcharts";
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
function parseTime(timeStr: any) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  console.log(hours, minutes);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  console.log(year, month, day, hours, minutes);
  return new Date(year, month, day, hours, minutes);
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
    color: ['#0afefb', '#fd03fb', '#f8fa02', '#0205ff', '#fa0106',
      '#08f902', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
      '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
      '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'],
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
      axisLabel: {
        // formatter: function (value) {
        //   return new Date(Number(value)).getHours() + ":" + new Date(Number(value)).getMinutes()
        // }
      },
      axisLine: {
        symbol: 'none',
        lineStyle: {
          color: '#B4C0CC',
        },
      },
    },

    tooltip: {
      trigger: 'item', // 触发类型，默认数据项触发，可选为：'item' | 'axis'
      formatter: function (params: any) {
        // params 是一个包含数据点信息的对象，可以根据需要自定义显示内容
        // 例如，这里只显示数据值和名称
        return params.seriesName + '<br/>' + params.name + ' : ' + params.value;
      }
    },
    legend: {
      data: [],
      icon: 'circle',
      itemWidth: 5,
      itemHeight: 5,
      left: 80,
      textStyle: {
        color: '#C6D1DB',
        fontSize: 10,
      },
      show: true,
    },
    yAxis: [
      {
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
      {
        type: "value",
        showSymbol: false,
        position: "right",
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
      }
    ],
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

      let seriesParam = [];
      let flag = 0;
      let legend = [];
      for (const element of chartData.list) {
        for (let j = 0; j < element.axis.length; j++) {
          const childName = element.axis[j];
          const childData = element.data[j];
          legend.push(element.name + "-" + childName);
          let join = [
            ' {a|{c}}',
            '{d|●}'
          ].join('')
          let param = {
            data: childData,
            name: element.name + "-" + childName,
            type: "line",
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
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
              width: 2,
            },
          }
          flag++
          if (childName === '温度') {
            param.yAxisIndex = 1;
          }
          seriesParam.push(param);
        }
      }

      // 更新配置项
      newOptions.title.text = chartData.name;
      newOptions.legend.data = legend;
      newOptions.xAxis.data = chartData.list[0]?.time
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
