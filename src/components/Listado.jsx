import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import swAlert from '@sweetalert/with-react'

function Listado() {
  const [moviesList, setMoviesList] = useState([]);

  let token = sessionStorage.getItem("token");

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=42b65a75bcff9e0cf48e9c9896e3cdfe&language=es-ES&sort_by=popularity.desc&include_adult=false";
    axios.get(endPoint).then((response) => {
      const apiData = response.data.results;
      setMoviesList(apiData);
    })
    .catch(error => {
       swAlert(<h2>Tuvimos problemas, inténtalo de nuevo</h2>)
        })
  }, [setMoviesList]);

  return (
    <>
      {!token && <Navigate to="/" />}
      <div className="row">
      {moviesList.map((movie, idx) => {
        return (
            <div className="col-3" key={idx}>
              <div className="card">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{movie.title.substring(0,30)}...</h5>
                  <p className="card-text">
                    {movie.overview.substring(0,100)}...
                  </p>
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
  );
}

export default Listado;
