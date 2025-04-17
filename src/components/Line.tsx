import { useRef, useState, useEffect } from 'react';
import useECharts from '@/unitls/useEcharts';
import React from 'react';
import { cloneDeep } from "lodash-es";

const BarChartComponent = ({ option = {}, chartData = [], height = "100vh", width = "100vw" }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const colorList = ["#0060b9", "#00dcd3", "#ffffff"]
    const [options] = useState({
        xAxis: {
            type: 'category',
            data: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            },
            {
                data: [220, 332, 801, 234, 790, 330, 320],
                type: 'line'
            },
            {
                data: [850, 902, 900, 34, 290, 530, 220],
                type: 'line'
            }
        ]
    });

    const { resizeChart } = useECharts({
        container: containerRef,
        options,
        resize: true
    });

    function initChart() {
        if (option) {
            Object.assign(option, cloneDeep(option));
        }
        resizeChart();
    }
    useEffect(() => {
        initChart();
    }, [chartData, height, width, option]);
    return (
        <div
            ref={containerRef}
            style={{ width: width, height: height }}
        />
    );
};

export default BarChartComponent;