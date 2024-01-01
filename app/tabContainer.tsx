"use client";

import { useState } from "react";
import CurrentFlightData from "./assignmentA";
import LiveStreamData from "./assignmentB";

export const TabContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState("current");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const activeTabStyle =
    "border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white";
  const nonActiveTabStyle =
    "border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4";

  return (
    <div>
      <ul className="flex">
        <li className="flex-1 mr-2">
          <a
            className={`text-center block border ${
              activeTab === "current" ? activeTabStyle : nonActiveTabStyle
            }`}
            href="#"
            onClick={() => handleTabClick("current")}
          >
            Current Status
          </a>
        </li>
        <li className="flex-1 mr-2">
          <a
            className={`text-center block border ${
              activeTab === "live" ? activeTabStyle : nonActiveTabStyle
            }`}
            href="#"
            onClick={() => handleTabClick("live")}
          >
            Live Streaming Data
          </a>
        </li>
      </ul>
      <br />
      <div>
        {activeTab === "current" ? <CurrentFlightData /> : <LiveStreamData />}
      </div>
    </div>
  );
};

export default TabContainer;
