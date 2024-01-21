import DrawerLeft from "./components/DrawerPage";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DrawerLeft show={1} />} />
        <Route path="/add-project" element={<DrawerLeft show={2} />} />
      </Routes>
    </div>
  );
}

export default App;
