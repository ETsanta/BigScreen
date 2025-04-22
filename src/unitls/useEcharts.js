import { useEffect, useRef, MutableRefObject } from 'react';
import * as echarts from 'echarts';
import { nextTick } from '@/unitls/nextTick';


const useECharts = ({
  container,
  options,
  resize = true
}) => {
  const chartInstance = useRef(null);
  const containerRef = useRef(null);

  // 初始化图表
  useEffect(() => {
    if (!container) {
      console.warn('ECharts container not found');
      return;
    }

    // 处理不同的 container 格式
    const containerElement = container instanceof HTMLElement
      ? container
      : container.current;

    if (!containerElement) {
      console.warn('ECharts container element not found');
      return;
    }

    if (!echarts) {
      console.error('ECharts not loaded');
      return;
    }

    // 初始化实例
    chartInstance.current = echarts.init(containerElement);
    containerRef.current = containerElement;

    // 组件卸载时销毁
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [container]);

  // 更新配置
  useEffect(() => {
    if (chartInstance.current && options) {
      chartInstance.current.setOption(options);
    }
  }, [options]);

  // 处理窗口 resize
  useEffect(() => {
    if (!resize || !chartInstance.current) return;

    const handleResize = () => {
      nextTick(() => {
        chartInstance.current?.resize();
      })
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [resize]);


  // 手动触发 resize 的方法
  const resizeChart = () => {
    chartInstance.current?.resize();
  };

  const setOptions = (newOptions) => {
    chartInstance.current?.setOption(newOptions);
  };

  return { chartInstance, resizeChart, setOptions };
};

export default useECharts;