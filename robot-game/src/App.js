import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
