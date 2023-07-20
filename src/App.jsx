import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Applications from "./components/Applications";
import Settings from "./components/Settings";

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route path="applications" element={<Applications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="login" element={<div>login page</div>}/>
      </Routes>
    </Router>
  )
}

export default App;
