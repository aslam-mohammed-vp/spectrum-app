"use client";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Data } from "./Types";
import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";

export const LiveStreamData: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [isAscending, setIsAscending] = useState(false);
  const [isActionRequired, setActionRequired] = useState(false);
  const [requestAction, setRequestAction] = useState(false);

  const [velocity, setVelocity] = useState<string>("");

  const [altitude, setAltitude] = useState<string>("");

  const [temp, setTemp] = useState<string>("");

  useEffect(() => {
    const webSocket = new WebSocket(
      "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS"
    );

    webSocket.onopen = () => {
      console.log("connected");
    };

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      processSpectrumData(data);
    };

    return () => {
      webSocket.close();
    };
  }, []);

  useEffect(() => {
    if (isActionRequired) {
      setRequestAction(true);
    }
  }, [isActionRequired]);

  const processSpectrumData = (data: any) => {
    setVelocity(data.Velocity);

    setAltitude(data.Altitude);

    setTemp(data.Temperature);

    setStatusMessage(data.StatusMessage);
    setIsAscending(data.IsAscending);
    setActionRequired(data.IsAscending);
  };

  const handleTakeAction = () => {
    setRequestAction(false);

    //api call to take action

    fetch(
      "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum",
      { method: "PUT" }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
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
          <h1>Aircraft is :{isAscending ? "Ascending" : "Descending"}</h1>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-full flex bg-gray-100 h-12 text-black font-bold items-center justify-center">
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
        <div className="w-1/3 bg-gray-200 h-400 text-black font-bold items-center justify-center">
          <ReactECharts option={altitudeOptions} />
          <h2 style={{ textAlign: "center" }}>Altitude</h2>
        </div>
        <div className="w-1/3 bg-gray-100 h-400 text-black font-bold items-center justify-center">
          <ReactECharts option={tempOptions} />
          <h2 style={{ textAlign: "center" }}>Temperature</h2>
        </div>
      </div>

      <br />
      {requestAction && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative "
          role="alert"
        >
          <strong className="font-bold">Attention Please!</strong>
          <span className="block sm:inline">
            Something seriously bad happened.
          </span>

          <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
          <br />

          <div className="flex mb-4 ">
            <div
              className="w-full h-12 items-center"
              style={{ textAlign: "center" }}
            >
              <button
                onClick={() => {
                  handleTakeAction();
                }}
                className="bg-red-500 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span>TAKE ACTION</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStreamData;
