import React, { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import { MetricContext } from "../context/MetricContext";
import "./Metrics.css";

export const Metrics = () => {
  const { metrics } = useContext(MetricContext);

  const chartRefMinute = useRef(null);
  const chartRefHour = useRef(null);
  const chartRefDay = useRef(null);

  // Función para crear o actualizar un gráfico de línea utilizando D3.js
  const updateLineChart = (data, xKey, yKey, ref) => {
    // Dimensiones del gráfico
    const width = 500;
    const height = 300;

    // Escalas
    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d[xKey]))
      .range([0, width])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[yKey])])
      .range([height, 0]);

    // Selecciona el SVG existente o crea uno nuevo si no hay
    let svg = d3.select(ref.current).select("svg");
    if (svg.empty()) {
      svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    }

    // Limpiar elementos anteriores
    svg.selectAll("*").remove();

    // Ejes
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));

    // Línea
    const line = d3
      .line()
      .x((d) => xScale(d[xKey]))
      .y((d) => yScale(d[yKey]));

    // Añadir o actualizar la línea
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#00ADB5")
      .attr("stroke-width", 2)
      .attr("d", line);
  };

  // Procesamiento de datos
  useEffect(() => {
    // Agrupar datos por minuto
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

    // Agrupar datos por hora
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

    // Agrupar datos por día
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

    // Actualizar gráficos de línea con los datos procesados
    updateLineChart(dataByMinute, "time", "value", chartRefMinute);
    updateLineChart(dataByHour, "time", "value", chartRefHour);
    updateLineChart(dataByDay, "date", "value", chartRefDay);
  }, [metrics]);

  return (
    <div className="metrics-container">
      <h1>Request metrics</h1>
      <div className="charts-container">
        <div className="chart-container">
          <h3>Requests per minute</h3>
          <div ref={chartRefMinute} className="chart"></div>
        </div>
        <div className="chart-container">
          <h3>Requests per hour</h3>
          <div ref={chartRefHour} className="chart"></div>
        </div>
        <div className="chart-container">
          <h3>Requests per day</h3>
          <div ref={chartRefDay} className="chart"></div>
        </div>
      </div>
    </div>
  );
};
