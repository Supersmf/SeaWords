import {
  useRef,
  FC,
  useState,
  useEffect,
  MouseEvent,
  TouchEvent,
  useMemo,
  useCallback,
  Dispatch,
  SetStateAction,
  Touch,
} from "react";
import { twMerge } from "tailwind-merge";

type PointType = { x: number; y: number };

const CIRCLE_MARGIN = 60;

export type LetterCircleType = {
  letters: string[];
  onLetterChange: Dispatch<SetStateAction<string[]>>;
  onCheckData: () => void;
  className?: string;
};

const LetterCircle: FC<LetterCircleType> = ({
  letters,
  onLetterChange,
  onCheckData,
  className,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [radius, setRadius] = useState<number>(150);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [selectedLettersIds, setSelectedLettersIds] = useState<string[]>([]);
  const [mouseCoordinate, setMouseCoordinate] = useState<PointType>();

  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const { clientWidth, clientHeight } = svgRef.current;
        setRadius(Math.min(clientWidth, clientHeight) / 2);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const circleCenter = useMemo(
    () => ({ x: radius + CIRCLE_MARGIN, y: radius + CIRCLE_MARGIN }),
    [radius]
  );

  const getLetterPosition = useCallback(
    (index: number) => {
      const angle = (index / letters.length) * (2 * Math.PI);
      const x = circleCenter.x + radius * Math.cos(angle - Math.PI / 2);
      const y = circleCenter.y + radius * Math.sin(angle - Math.PI / 2);
      return { x, y };
    },
    [circleCenter, letters.length, radius]
  );

  const values = useMemo(
    () =>
      letters.reduce<Record<string, PointType & { label: string }>>(
        (res, letter, index) => {
          res[letter + index] = {
            label: letter,
            ...getLetterPosition(index),
          };
          return res;
        },
        {}
      ),
    [getLetterPosition, letters]
  );

  const handleMouseDown = (letterId: string) => {
    setSelectedLettersIds([letterId]);
    onLetterChange([values[letterId].label]);
    setIsDrawing(true);
  };

  const handleMouseMove = (
    { clientX, clientY }: MouseEvent<SVGSVGElement> | Touch = {} as Touch
  ) => {
    if (isDrawing && svgRef.current && clientX && clientY) {
      const svg = svgRef.current;
      const point = svg.createSVGPoint();

      point.x = clientX;
      point.y = clientY;

      const { x, y } = point.matrixTransform(svg.getScreenCTM()?.inverse());

      setMouseCoordinate({ x, y });

      Object.entries(values).forEach(([id, { x: elementX, y: elementY }]) => {
        const distance = Math.sqrt(
          Math.pow(x - elementX, 2) + Math.pow(y - elementY, 2)
        );

        if (distance < CIRCLE_MARGIN) {
          handleCircleMouseOver(id);
        }
      });
    }
  };

  const handleTouchMove = ({ touches }: TouchEvent<SVGSVGElement>) => {
    handleMouseMove(touches[0]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setSelectedLettersIds([]);
    setMouseCoordinate(undefined);
    onCheckData();
  };

  const handleCircleMouseOver = (letterId: string) => {
    if (isDrawing) {
      if (!selectedLettersIds.includes(letterId)) {
        setSelectedLettersIds((oldData) => [...oldData, letterId]);
        onLetterChange((oldData) => [...oldData, values[letterId].label]);
      } else if (
        letterId === selectedLettersIds[selectedLettersIds.length - 2]
      ) {
        setSelectedLettersIds((oldData) => {
          const newData = [...oldData];

          newData.pop();
          return [...newData];
        });
        onLetterChange((oldData) => {
          const newData = [...oldData];

          newData.pop();
          return [...newData];
        });
      }
    }
  };

  const pathData = selectedLettersIds
    .map((letterId, index) => {
      const { x, y } = values[letterId];
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="75%"
      viewBox={`0 -5 ${2 * (radius + CIRCLE_MARGIN)} ${
        2 * (radius + CIRCLE_MARGIN)
      }`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...(isDrawing
        ? {
            onMouseMove: handleMouseMove,
            onTouchMove: handleTouchMove,
            onMouseUp: handleMouseUp,
            onTouchEnd: handleMouseUp,
            onMouseLeave: handleMouseUp,
          }
        : {})}
    >
      <circle
        cx={circleCenter.x}
        cy={circleCenter.y}
        r={radius}
        fill="none"
        strokeWidth={20}
        stroke="#000"
        className="stroke-blue-200"
      />
      {Object.entries(values).map(([id, { label, x, y }]) => (
        <g
          key={id}
          onMouseDown={() => handleMouseDown(id)}
          onTouchStart={() => handleMouseDown(id)}
          onMouseOver={() => handleCircleMouseOver(id)}
          className="cursor-pointer"
        >
          <circle
            cx={x}
            cy={y + 5}
            r={radius / 3.75}
            className={twMerge(
              "fill-gray-200 shadow-circle",
              selectedLettersIds.includes(id) && "fill-red-200"
            )}
          />
          <circle
            cx={x}
            cy={y}
            r={radius / 3.75}
            className={twMerge(
              "fill-white shadow-circle",
              selectedLettersIds.includes(id) && "fill-red-100"
            )}
          />
          <text
            x={x}
            y={y}
            textAnchor="middle"
            dy=".3em"
            className="text-3xl phone:text-[42px] sl:text-[57px] select-none"
          >
            {label}
          </text>
        </g>
      ))}
      {isDrawing && mouseCoordinate && (
        <path
          d={`${pathData} L ${mouseCoordinate?.x} ${mouseCoordinate?.y}`}
          fill="none"
          strokeWidth="20"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="stroke-blue-300 pointer-events-none"
        />
      )}
    </svg>
  );
};

export default LetterCircle;
