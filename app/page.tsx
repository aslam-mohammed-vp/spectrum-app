"use Client";
import { MouseEvent, useEffect } from "react";
import LineChart from "./LineCharts";
import CurrentFlightData from "./assignmentA";
import LiveStreamData from "./assignmentB";
import TabContainer from "./tabContainer";

export default function Home() {
  return (
    <main className="container mx-auto">
      <TabContainer />
    </main>
  );
}
