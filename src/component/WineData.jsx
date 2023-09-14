
import React, { useEffect, useState } from 'react';
import winedata from '../data.json';

const WineData = () => {
  // const [data, setData] = useState([]);
  const [classwiseStats, setClasswiseStats] = useState([]);

  useEffect(() => {
    const sampleData = winedata;

    // Gamma for each data point
    const newData = sampleData.map((row) => ({
      ...row,
      Gamma: (row.Ash * row.Hue) / row.Magnesium,
    }));

    // Calculate class-wise statistics
    const groupedData = groupBy(newData, 'Alcohol');
    const classwiseStats = Object.keys(groupedData).map((key) => {
      const group = groupedData[key];
      return {
        Class: key,
        MeanGamma: calculateMean(group, 'Gamma'),
        MedianGamma: calculateMedian(group, 'Gamma'),
        ModeGamma: calculateMode(group, 'Gamma'),
      };
    });

    // setData(newData);
    setClasswiseStats(classwiseStats);
  }, []);

  // Function to calculate mean of an array
  const calculateMean = (array, property) => {
    const sum = array.reduce((acc, obj) => acc + obj[property], 0);
    return sum / array.length;
  };

  // Function to calculate median of an array
  const calculateMedian = (array, property) => {
    const sortedArray = array.map((obj) => obj[property]).sort((a, b) => a - b);
    const middle = Math.floor(sortedArray.length / 2);
    if (sortedArray.length % 2 === 0) {
      return (sortedArray[middle - 1] + sortedArray[middle]) / 2;
    } else {
      return sortedArray[middle];
    }
  };

  // Function to calculate mode of an array
  const calculateMode = (array, property) => {
    const frequencyMap = {};
    array.forEach((obj) => {
      const value = obj[property];
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });

    let mode = [];
    let maxFrequency = 0;

    for (const key in frequencyMap) {
      if (frequencyMap[key] > maxFrequency) {
        mode = [key];
        maxFrequency = frequencyMap[key];
      } else if (frequencyMap[key] === maxFrequency) {
        mode.push(key);
      }
    }

    return mode.join(', ');
  };

  // Function to group data by a property
  function groupBy(arr, property) {
    return arr.reduce(function (acc, obj) {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Wine Data Analysis</h1>
      <table border='1px'>
        <thead>
          <tr>
            <th>Class</th>
            <th>Mean Gamma</th>
            <th>Median Gamma</th>
            <th>Mode Gamma</th>
          </tr>
        </thead>
        <tbody>
          {classwiseStats.map((stats) => (
            <tr key={stats.Class}>
              <td>{stats.Class}</td>
              <td>{stats.MeanGamma.toFixed(3)}</td>
              <td>{stats.MedianGamma.toFixed(3)}</td>
              <td>{stats.ModeGamma}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WineData;
