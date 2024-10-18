import React from "react";
import MainLayout from "./components/layout/MainLayout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NetworkOverview from "./pages/NetworkOverview";

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<NetworkOverview />} />
          {/* Define other routes here for different pages */}
        </Routes>
      </MainLayout>
    </Router> 
  );
};

export default App;
