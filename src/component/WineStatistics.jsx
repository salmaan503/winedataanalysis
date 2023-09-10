import React, { useState, useEffect } from 'react';
import wineData from '../data.json'



const WineStatistics = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    // Calculate class-wise statistics for Flavanoids
    const classStatistics = {};
    wineData.forEach((wine) => {
      const { Alcohol, Flavanoids } = wine;
      if (!classStatistics[Alcohol]) {
        classStatistics[Alcohol] = [];
      }
      classStatistics[Alcohol].push(Flavanoids);
    });

    // Calculate mean, median, and mode for each class
    const classStatsArray = [];
    for (const alcoholClass in classStatistics) {
      const classData = classStatistics[alcoholClass];
      const mean = calculateMean(classData);
      const median = calculateMedian(classData);
      const mode = calculateMode(classData);
      classStatsArray.push({ Alcohol: alcoholClass, Mean: mean, Median: median, Mode: mode });
    }

    setStatistics(classStatsArray);
  }, []);

  // function to calculate mean
  const calculateMean = (data) => {
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
  };

  //  function to calculate median
  const calculateMedian = (data) => {
    data.sort((a, b) => a - b);
    const middle = Math.floor(data.length / 2);
    return data.length % 2 === 0 ? (data[middle - 1] + data[middle]) / 2 : data[middle];
  };

  //  function to calculate mode
  const calculateMode = (data) => {
    const counts = {};
    data.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
    });
    let mode;
    let maxCount = 0;
    for (const value in counts) {
      if (counts[value] > maxCount) {
        mode = value;
        maxCount = counts[value];
      }
    }
    return mode;
  };

  return (
    <div>
      <h2>Wine Statistics</h2>
      <table border='1px'>
        <thead>
          <tr>
            <th>Alcohol Class</th>
            <th>Mean</th>
            <th>Median</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          {statistics.map((stat, index) => (
            <tr key={index}>
              <td>{stat.Alcohol}</td>
              <td>{stat.Mean.toFixed(3)}</td>
              <td>{stat.Median.toFixed(3)}</td>
              <td>{stat.Mode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WineStatistics;
