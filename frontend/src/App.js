import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/components/HomePage";
import CustomCursor from "@/components/CustomCursor";

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
