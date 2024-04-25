import React, { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import { MetricContext } from "../context/MetricContext";
import { strings } from "../utils/strings";

import "./Metrics.css";

export const Metrics = () => {
  const { metrics } = useContext(MetricContext);

  const chartRefMinute = useRef(null);
  const chartRefHour = useRef(null);
  const chartRefDay = useRef(null);

  // Function to create or update a line chart using D3.js
  const updateLineChart = (data, xKey, yKey, ref) => {
    // Chart dimensions
    const width = 500;
    const height = 300;

    // Scales
    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d[xKey]))
      .range([0, width])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[yKey])])
      .range([height, 0]);

    // Select existing SVG or create a new one if there isn't any
    let svg = d3.select(ref.current).select("svg");
    if (svg.empty()) {
      svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    }

    // Clean previous elements
    svg.selectAll("*").remove();

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));

    // Line
    const line = d3
      .line()
      .x((d) => xScale(d[xKey]))
      .y((d) => yScale(d[yKey]));

    // Add or update the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#00ADB5")
      .attr("stroke-width", 2)
      .attr("d", line);
  };

  // Data processing
  useEffect(() => {
    // Group data by minute
    const dataByMinute = [];
    const dataByMinuteMap = new Map();

    metrics.forEach((item) => {
      const timestamp = new Date(item.timestamp);
      const minute = timestamp.toLocaleTimeString("es-ES", {
        hour12: false,
        minute: "2-digit",
      });
      const count = dataByMinuteMap.get(minute) || 0;
      dataByMinuteMap.set(minute, count + 1);
    });

    dataByMinuteMap.forEach((count, minute) => {
      dataByMinute.push({ time: minute, value: count });
    });

    // Group data by hour
    const dataByHour = [];
    const dataByHourMap = new Map();

    metrics.forEach((item) => {
      const timestamp = new Date(item.timestamp);
      const hour = timestamp.toLocaleTimeString("es-ES", {
        hour12: false,
        hour: "2-digit",
      });
      const count = dataByHourMap.get(hour) || 0;
      dataByHourMap.set(hour, count + 1);
    });

    dataByHourMap.forEach((count, hour) => {
      dataByHour.push({ time: hour, value: count });
    });

    // Group data by day
    const dataByDay = [];
    const dataByDayMap = new Map();

    metrics.forEach((item) => {
      const timestamp = new Date(item.timestamp);
      const day = timestamp.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const count = dataByDayMap.get(day) || 0;
      dataByDayMap.set(day, count + 1);
    });

    dataByDayMap.forEach((count, day) => {
      dataByDay.push({ date: day, value: count });
    });

    // Update line charts with processed data
    updateLineChart(dataByMinute, "time", "value", chartRefMinute);
    updateLineChart(dataByHour, "time", "value", chartRefHour);
    updateLineChart(dataByDay, "date", "value", chartRefDay);
  }, [metrics]);

  return (
    <div className="metrics-container">
      <h1>{strings.metricsPage.title}</h1>
      <div className="charts-container">
        <div className="chart-container">
          <h3>{strings.metricsPage.minuteTitle}</h3>
          <div ref={chartRefMinute} className="chart"></div>
        </div>
        <div className="chart-container">
          <h3>{strings.metricsPage.hourTitle}</h3>
          <div ref={chartRefHour} className="chart"></div>
        </div>
        <div className="chart-container">
          <h3>{strings.metricsPage.dayTitle}</h3>
          <div ref={chartRefDay} className="chart"></div>
        </div>
      </div>
    </div>
  );
};
