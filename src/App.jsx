import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Applications from "./components/Applications";
import Application from "./components/Application";
import Settings from "./components/Settings";

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route path="applications" element={<Applications />} />
          <Route path="application/:application_id/:application_name" element={<Application />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="login" element={<div>login page</div>}/>
      </Routes>
    </Router>
  )
}

export default App;
