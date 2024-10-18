import React from "react";
import MainLayout from "./components/layout/MainLayout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NetworkOverview from "./pages/NetworkOverview";
import TrafficAnalysis from "./pages/TrafficAnalysis";
import PacketInspection from "./pages/PacketInspection";
import Logs from "./pages/Logs";
// import IntrusionDetection from "./pages/IntrusionDetection";

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<NetworkOverview />} />
          <Route path="/traffic-analysis" element={<TrafficAnalysis />} />
          <Route path="/packet-inspection" element={<PacketInspection />} />
          <Route path="/logs" element={<Logs />} />
          {/* <Route path="/intrusion-detection" element={<IntrusionDetection />} />  */}
        </Routes>
      </MainLayout>
    </Router> 
  );
};

export default App;
