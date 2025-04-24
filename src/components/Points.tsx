import React, { 
  useRef, 
  useEffect, 
  useState, 
  useCallback, 
  useMemo 
} from 'react';
import debounce from 'lodash/debounce';

// 类型定义
type Position = { x: number; y: number };

interface MarkerPoint {
  x: number;       // 原始图片坐标X
  y: number;       // 原始图片坐标Y
  color: string;   // 标记颜色
  data?: any;      // 自定义数据
}

interface ImageMarkerProps {
  image: string | HTMLImageElement;  // 支持模块化导入
  points?: MarkerPoint[];
  radius?: number;
  tooltip?: (point: MarkerPoint) => React.ReactNode;
  aspectRatio?: number;    // 强制宽高比
  className?: string;
}

// 智能定位配置
const TOOLTIP_PADDING = 5;
const ARROW_SIZE = 8;

const ImageMarker: React.FC<ImageMarkerProps> = ({
  image: imageSource,
  points = [],
  radius = 10,
  tooltip,
  aspectRatio,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [scaleInfo, setScaleInfo] = useState({ 
    scale: 5, 
    offsetX: 0, 
    offsetY: 0,
    dpr: 5 
  });
  const [hoverPoint, setHoverPoint] = useState<MarkerPoint | null>(null);
  const [tooltipPos, setTooltipPos] = useState<Position>({ x: 0, y: 0 });
  const [tooltipDirection, setTooltipDirection] = useState('bottom-right');

  // 稳定化points引用
  const stablePoints = useMemo(() => points, [JSON.stringify(points)]);

  // 图片加载逻辑
  useEffect(() => {
    let isActive = true;

    const loadImage = async (src: string | HTMLImageElement) => {
      try {
        if (typeof src === 'string') {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = src;
          await img.decode();
          if (isActive) setImage(img);
        } else if (src.complete) {
          if (isActive) setImage(src);
        } else {
          const handleLoad = () => isActive && setImage(src);
          src.addEventListener('load', handleLoad);
          return () => src.removeEventListener('load', handleLoad);
        }
      } catch (error) {
        console.error('图片加载失败:', error);
      }
    };

    loadImage(imageSource);

    return () => { isActive = false; };
  }, [imageSource]);

  // 计算画布尺寸
  const calculateDimensions = useCallback(() => {
    if (!containerRef.current || !image || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;

    // 容器尺寸
    const containerWidth = container.clientWidth;
    const containerHeight = aspectRatio 
      ? containerWidth / aspectRatio 
      : container.clientHeight;

    // 设置canvas尺寸
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;

    // 计算图片缩放
    const scale = Math.min(
      containerWidth / image.naturalWidth,
      containerHeight / image.naturalHeight
    );

    // 居中偏移量
    const offsetX = (containerWidth - image.naturalWidth * scale) / 2;
    const offsetY = (containerHeight - image.naturalHeight * scale) / 2;

    setScaleInfo(prev => ({
      scale,
      offsetX: offsetX * dpr,
      offsetY: offsetY * dpr,
      dpr
    }));
  }, [image, aspectRatio]);

  // 绘制逻辑
  const draw = useCallback(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制图片
    ctx.save();
    ctx.scale(scaleInfo.dpr, scaleInfo.dpr);
    ctx.drawImage(
      image,
      scaleInfo.offsetX / scaleInfo.dpr,
      scaleInfo.offsetY / scaleInfo.dpr,
      image.naturalWidth * scaleInfo.scale,
      image.naturalHeight * scaleInfo.scale
    );

    // 绘制标记点
    stablePoints.forEach(point => {
      const x = scaleInfo.offsetX + point.x * scaleInfo.scale * scaleInfo.dpr;
      const y = scaleInfo.offsetY + point.y * scaleInfo.scale * scaleInfo.dpr;

      ctx.beginPath();
      ctx.arc(
        x / scaleInfo.dpr,
        y / scaleInfo.dpr,
        radius * scaleInfo.dpr,
        0,
        Math.PI * 2
      );
      
      ctx.fillStyle = point.color;
      ctx.fill();
      
      // 高亮效果
      ctx.strokeStyle = hoverPoint === point ? 'rgba(255,255,255,0.8)' : 'white';
      ctx.lineWidth = hoverPoint === point ? 3 : 2;
      ctx.stroke();
    });

    ctx.restore();
  }, [image, radius, hoverPoint, scaleInfo, stablePoints]);

  // 智能计算弹窗位置
  const calculateTooltipPosition = useCallback((mouseX: number, mouseY: number) => {
    if (!tooltipRef.current) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 可用空间计算
    const space = {
      right: viewportWidth - mouseX - TOOLTIP_PADDING,
      left: mouseX - TOOLTIP_PADDING,
      bottom: viewportHeight - mouseY - TOOLTIP_PADDING,
      top: mouseY - TOOLTIP_PADDING
    };

    // 方向判断逻辑
    let direction = 'bottom-right';
    let posX = mouseX + ARROW_SIZE;
    let posY = mouseY + ARROW_SIZE;

    if (space.right < tooltipRect.width) {
      direction = direction.replace('right', 'left');
      posX = mouseX - tooltipRect.width - ARROW_SIZE;
    }

    if (space.bottom < tooltipRect.height) {
      direction = direction.replace('bottom', 'top');
      posY = mouseY - tooltipRect.height - ARROW_SIZE;
    }

    // 边界保护
    posX = Math.max(TOOLTIP_PADDING, 
      Math.min(posX, viewportWidth - tooltipRect.width - TOOLTIP_PADDING));
    posY = Math.max(TOOLTIP_PADDING,
      Math.min(posY, viewportHeight - tooltipRect.height - TOOLTIP_PADDING));

    setTooltipPos({ x: posX, y: posY });
    setTooltipDirection(direction);
  }, []);

  // 处理鼠标移动
  const handleMouseMove = useCallback(debounce((e: MouseEvent) => {
    if (!canvasRef.current || !image) return;

    // 转换到原始图片坐标
    const rect = canvasRef.current.getBoundingClientRect();
    const rawX = (e.clientX - rect.left) * scaleInfo.dpr - scaleInfo.offsetX;
    const rawY = (e.clientY - rect.top) * scaleInfo.dpr - scaleInfo.offsetY;
    const originX = rawX / (scaleInfo.scale * scaleInfo.dpr);
    const originY = rawY / (scaleInfo.scale * scaleInfo.dpr);

    // 查找悬停点
    const target = stablePoints.find(point => {
      const dx = originX - point.x;
      const dy = originY - point.y;
      return Math.sqrt(dx * dx + dy * dy) < radius * 2;
    });

    setHoverPoint(target || null);
    if (target) calculateTooltipPosition(e.clientX, e.clientY);
  }, 50), [image, scaleInfo, stablePoints, radius, calculateTooltipPosition]);

  // 初始化事件监听
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // 响应尺寸变化
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(
      debounce(() => {
        calculateDimensions();
        draw();
      }, 100)
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [calculateDimensions, draw]);

  // 初始绘制
  useEffect(() => {
    calculateDimensions();
    draw();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{ 
        position: 'relative',
        width: '100%',
        height: aspectRatio ? 'auto' : '100%'
      }}
    >
      <canvas ref={canvasRef} />

      {tooltip && hoverPoint && hoverPoint.data && Object.keys(hoverPoint.data).length && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            left: tooltipPos.x,
            top: tooltipPos.y,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            pointerEvents: 'none',
            zIndex: 1000,
            transition: 'all 0.2s ease',
            
            '&::after': {
              content: '""',
              position: 'absolute',
              width: 0,
              height: 0,
              border: `${ARROW_SIZE}px solid transparent`,
              ...getArrowStyle(tooltipDirection)
            }
          }}
        >
          {tooltip(hoverPoint)}
        </div>
      )}
    </div>
  );
};

// 箭头方向样式
const getArrowStyle = (direction: string): React.CSSProperties => {
  const base = { 
    border: `${ARROW_SIZE}px solid transparent`,
    position: 'absolute' 
  };

  switch(direction) {
    case 'bottom-right':
      return { ...base, top: -ARROW_SIZE * 2, left: ARROW_SIZE, borderBottomColor: 'white' };
    case 'bottom-left':
      return { ...base, top: -ARROW_SIZE * 2, right: ARROW_SIZE, borderBottomColor: 'white' };
    case 'top-right':
      return { ...base, bottom: -ARROW_SIZE * 2, left: ARROW_SIZE, borderTopColor: 'white' };
    case 'top-left':
      return { ...base, bottom: -ARROW_SIZE * 2, right: ARROW_SIZE, borderTopColor: 'white' };
    default:
      return base;
  }
};

export default React.memo(ImageMarker);