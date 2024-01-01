"use client";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Data } from "./Types";
import { useEffect, useMemo, useState } from "react";

export const LineChart: React.FC = () => {
  const DATA_LENGTH = 10;

  const [statusMessage, setStatusMessage] = useState("");
  const [isAscending, setIsAscending] = useState(false);
  const [isActionRequired, setActionRequired] = useState(false);

  const [velocity, setVelocity] = useState<string[]>([]);
  const [velocityData, setVelocityData] = useState<any>({
    labels: [],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Velocity",
        data: velocity,
        // you can set indiviual colors for each bar
        borderColor: "Red",
        borderWidth: 1,
      },
    ],
  });
  const [altitude, setAltitude] = useState<string[]>([]);
  const [altitudeData, setAltitudeData] = useState<any>({
    labels: [],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Altitude",
        data: velocity,
        // you can set indiviual colors for each bar
        borderColor: "Green",
        borderWidth: 1,
      },
    ],
  });
  const [temp, setTemp] = useState<string[]>([]);
  const [tempData, setTempData] = useState<any>({
    labels: [],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Altitude",
        data: velocity,
        // you can set indiviual colors for each bar
        borderColor: "Green",
        borderWidth: 1,
      },
    ],
  });

  function getSpectrumStatus() {
    fetch(
      "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus"
    )
      .then((response) => response.json())
      .then((json) => processSpectrumData(json))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getSpectrumStatus();
    const interval = setInterval(() => getSpectrumStatus(), 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const processSpectrumData = (data: any) => {
    setVelocity((prevVel) => {
      prevVel.push(data.velocity);
      setVelocityData({
        labels: Array.from(Array(DATA_LENGTH).keys()),
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
          {
            label: "Velocity",
            data: prevVel,
            // you can set indiviual colors for each bar
            borderColor: "Blue",
            borderWidth: 1,
          },
        ],
      });
      return prevVel.slice(-DATA_LENGTH);
    });

    setAltitude((prevVel) => {
      prevVel.push(data.altitude);
      setAltitudeData({
        labels: Array.from(Array(DATA_LENGTH).keys()),
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
          {
            label: "Altitude",
            data: prevVel,
            // you can set indiviual colors for each bar
            borderColor: "Green",
            borderWidth: 1,
          },
        ],
      });
      return prevVel.slice(-DATA_LENGTH);
    });

    setTemp((prevVel) => {
      prevVel.push(data.temperature);
      setTempData({
        labels: Array.from(Array(DATA_LENGTH).keys()),
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
          {
            label: "Temperature",
            data: prevVel,
            // you can set indiviual colors for each bar
            borderColor: "Red",
            borderWidth: 1,
          },
        ],
      });
      return prevVel.slice(-DATA_LENGTH);
    });

    setStatusMessage(data.statusMessage);
    setIsAscending(data.isAscending);
    setActionRequired(data.isAscending);
  };

  return (
    <div className="chart-container">
      <h1 style={{ textAlign: "center" }}>Status Message:{statusMessage}</h1>
      <h1 style={{ textAlign: "center" }}>
        Aircraft is :{isAscending ? "Ascending" : "Descending"}
      </h1>
      <h1 style={{ textAlign: "center" }}>
        Action:{isActionRequired ? "Required" : "Not Required"}
      </h1>
      <br />
      <h2 style={{ textAlign: "center" }}>Velocity</h2>
      <Line
        data={velocityData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Velocity for last ${DATA_LENGTH} seconds`,
            },
            legend: {
              display: false,
            },
          },
        }}
      />

      <h2 style={{ textAlign: "center" }}>Altitude</h2>
      <Line
        data={altitudeData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Altitude for last ${DATA_LENGTH} seconds`,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
      <h2 style={{ textAlign: "center" }}>Temperature</h2>
      <Line
        data={tempData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Temperature last ${DATA_LENGTH} seconds`,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
