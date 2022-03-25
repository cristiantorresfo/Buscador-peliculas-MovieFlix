//Libraries
import { Routes, Route } from "react-router-dom";

//Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import Listado from "./components/Listado";
import Login from "./components/Login";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";

//styles
import "./css/bootstrap.min.css";

function App() {
  return (
    <>
      <Header />
      <div className="container mt-3">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/listado" element={<Listado />} />
        <Route path="/detalle" element={<Detalle />} />
        <Route path="resultados" element={<Resultados />} />

      </Routes>
    </div>
      <Footer />
    </>
  );
}

export default App;
