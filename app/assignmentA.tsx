"use client";
import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";

export const CurrentFlightData: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [isAscending, setIsAscending] = useState(false);
  const [isActionRequired, setActionRequired] = useState(false);

  const [velocity, setVelocity] = useState<string>("");

  const [altitude, setAltitude] = useState<string>("");

  const [temp, setTemp] = useState<string>("");

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
  }, []);

  const processSpectrumData = (data: any) => {
    setVelocity(data.velocity);

    setAltitude(data.altitude);

    setTemp(data.temperature);

    setStatusMessage(data.statusMessage);
    setIsAscending(data.isAscending);
    setActionRequired(data.isAscending);
  };

  const velocityOptions = useMemo(
    () => ({
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          name: "Velocity",
          type: "gauge",
          detail: {
            formatter: "{value}",
          },
          startAngle: 200,
          endAngle: -20,
          min: -100,
          max: 100,
          data: [
            {
              value: Math.round(parseFloat(velocity)),
              name: "Km/H",
            },
          ],
        },
      ],
    }),
    [velocity]
  );

  const altitudeOptions = useMemo(
    () => ({
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          name: "Altitude",
          type: "gauge",
          detail: {
            formatter: "{value}",
          },
          startAngle: 200,
          endAngle: -20,
          min: -100,
          max: 100,
          data: [
            {
              value: Math.round(parseFloat(altitude)) / 1000,
              name: "Km",
            },
          ],
        },
      ],
    }),
    [altitude]
  );

  const tempOptions = useMemo(
    () => ({
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          name: "Temperature",
          center: ["50%", "60%"],
          startAngle: 200,
          endAngle: -20,
          min: -100,
          max: 100,
          type: "gauge",
          detail: {
            formatter: "{value}",
          },
          data: [
            {
              value: Math.round(parseFloat(temp)),
              name: "F",
            },
          ],
        },
      ],
    }),
    [temp]
  );

  return (
    <div>
      <div className="flex mb-4">
        <div className="w-full flex bg-gray-100 h-12 text-black font-bold items-center justify-center">
          <h1 className="items-center">
            Aircraft is :{isAscending ? "Ascending" : "Descending"}
          </h1>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-full flex bg-gray-200 h-12 text-black font-bold items-center justify-center">
          <h1>Action:{isActionRequired ? "Required" : "Not Required"}</h1>
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-full flex bg-gray-100 h-12 text-black font-bold items-center justify-center">
          <h1>Status Message:{statusMessage}</h1>
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-1/3 bg-gray-100 h-400 text-black font-bold items-center justify-center">
          <ReactECharts option={velocityOptions} />
          <h2 style={{ textAlign: "center" }}>Velocity</h2>
        </div>
        <div className="w-1/3 bg-gray-100 h-400 text-black font-bold items-center justify-center">
          <ReactECharts option={altitudeOptions} />
          <h2 style={{ textAlign: "center" }}>Altitude</h2>
        </div>
        <div className="w-1/3 bg-gray-100 h-400 text-black font-bold items-center justify-center">
          <ReactECharts option={tempOptions} />
          <h2 style={{ textAlign: "center" }}>Temperature</h2>
        </div>
      </div>

      <br />
      <div
        className="bg-gray-100 border border-green-400 px-4 py-3 rounded relative "
        role="alert"
      >
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
        <br />

        <div className="flex mb-4 ">
          <div
            className="w-full h-12 items-center"
            style={{ textAlign: "center" }}
          >
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded center"
              onClick={() => getSpectrumStatus()}
            >
              Get Latest Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentFlightData;
