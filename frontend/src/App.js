import Header from "./pages/components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Healing from "./pages/Healing";
import Divination from "./pages/Divination";
import Manifestation from "./pages/Manifestation";
import "./assets/styles/app.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="Body">
          <Routes >
            <Route path="/" element={<Home />}/>
            <Route path="/Healing" element={<Healing />}/>
            <Route path="/Divination" element={<Divination />}/>
            <Route path="/Manifest" element={<Manifestation />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;