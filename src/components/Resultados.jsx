import { useEffect, useState } from "react";
import swAlert from "@sweetalert/with-react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

function Resultados() {
  const [moviesResults, setMoviesResults] = useState([]);
  
  let token = sessionStorage.getItem('token')
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get('keyword');

  useEffect(() => {
    
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=42b65a75bcff9e0cf48e9c9896e3cdfe&language=es-ES&query=${keyword}`;
    axios
      .get(endPoint)
      .then((response) => {
        const moviesData = response.data.results;
        if(moviesData.length === 0) {
        swAlert(<h4>No hay resultados para tu búsqueda</h4>);

        };
        setMoviesResults(moviesData);
      })
      .catch(() => {
        swAlert(<h2>Hubo un error, inténtalo de nuevo</h2>);
      });
  },[moviesResults, keyword]);

  return (
    <>
    {!token && <Navigate to="/" />}
    <h2>Buscaste: <em>{keyword}</em></h2>
    {moviesResults.length === 0 && <h3>No hay resultados</h3>}
    <div className="row">
    {moviesResults.map((movie, idx) => {
      return (
          <div className="col-4" key={idx}>
            <div className="card">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{movie.title.substring(0,30)}...</h5>
                
                <Link to={`/detalle?movieID=${movie.id}`} className="btn btn-primary">
                  View detail
                </Link>
              </div>
            </div>
          </div>
      );
    })}
    </div>
  </>
  )
}
export default Resultados;
