import React, { FC, useRef, useEffect } from "react";
import * as d3 from "d3";

import { Item } from "../../types";
import Circle from "../Circle";
import classes from "./Chart.module.css";

const width = 650;
const height = 400;
const margin = { top: 30, right: 5, bottom: 20, left: 35 };
const offset = 15;

export interface Props {
	data: Item[];
	mean: any;
	setMean: any;
	std: any;
	setStd: any;
}

const Chart: FC<Props> = (props) => {
  const { data, mean, setMean, std, setStd } = props;

  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  const xMin = d3.min(data, (d: Item) => d.x) as number;
  const xMax = d3.max(data, (d: Item) => d.x) as number;
  const xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin.left, width - margin.right]);

  const stdScale = d3
    .scaleLinear()
    .domain([0.01, 10.0])
    .range([margin.left, width - margin.right]);

  const yMin = d3.min(data, (d: Item) => d.y) as number;
  const yMax = d3.max(data, (d: Item) => d.y) as number;
  const yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin.bottom, margin.top]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  useEffect(() => {
    d3.select(xAxisRef!.current!).call(xAxis as any);
    d3.select(yAxisRef!.current).call(yAxis as any);
  }, [xAxis, yAxis]);

  const lineGenerator = d3.line<Item>();
  lineGenerator.x((d) => xScale(d.x));
  lineGenerator.y((d) => yScale(d.y));

  const lineData = lineGenerator(data) ?? "";

  return (
    <svg
      className={classes.chart}
      preserveAspectRatio="xMinYMid meet"
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d={lineData}
        fill="none"
        stroke="#037fe1"
        strokeWidth="2"
      />
      <g>
        <g
          ref={xAxisRef}
          transform={`translate(0, ${height - margin.bottom})`}
        />
        <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`} />
      </g>

      <g className={classes.anchor}>
        <line
          strokeWidth={2}
          stroke="#037fe1"
          x1={xScale(mean) - offset}
          y1={yScale(yMax)}
          x2={xScale(mean) + offset}
          y2={yScale(yMax)}
        />
        <Circle
          cy={yScale(yMax)}
          cx={xScale(mean)}
          setVal={setMean}
          scale={xScale}
          axis="x"
        />
      </g>

      <g className={classes.anchor}>
        <line
          strokeWidth={2}
          stroke="#037fe1"
          x1={stdScale(std) - offset}
          y1={offset}
          x2={stdScale(std) + offset}
          y2={offset}
        />
        <Circle
          cy={offset}
          cx={stdScale(std)}
          setVal={setStd}
          scale={stdScale}
          axis="x"
          validator={(d: number) => d >= 0.1}
        />
      </g>
    </svg>
  );
};

export default Chart;
