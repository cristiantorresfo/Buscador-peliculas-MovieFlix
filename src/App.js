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
  const addOrRemoveFromFavs = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;
    const movieData = {
      imgURL,
      title,
      overview,
      id: btn.dataset.movieId,
    };
    const favMovies = localStorage.getItem("favs");
    let tempMovieFavs;

    if (favMovies === null) {
      tempMovieFavs = [];
    } else {
      tempMovieFavs = JSON.parse(favMovies);
    }
    console.log(tempMovieFavs + "temmp movies");
    const movieIsInArray = tempMovieFavs.some(
      (movie) => movie.id === movieData.id
    );
    console.log(movieIsInArray + "moviesinarray");
    if (!movieIsInArray) {
      tempMovieFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMovieFavs));
      console.log("agregada");
    } else {
      let moviesFiltered = tempMovieFavs.filter((movie) => {
        return movie.id !== movieData.id;
      });
      console.log(moviesFiltered + " movies filtered");
      localStorage.setItem("favs", JSON.stringify(moviesFiltered));
      console.log("Eliminada");
    }
  };
  return (
    <>
      <Header />
      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/listado"
            element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />}
          />
          <Route path="/detalle" element={<Detalle />} />
          <Route path="resultados" element={<Resultados />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
