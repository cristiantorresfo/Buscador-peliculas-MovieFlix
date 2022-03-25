import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"
import swAlert from '@sweetalert/with-react'

function Detalle(){

    const [movie, setMovie ]= useState(null)

    let token = sessionStorage.getItem('token')

    let query = new URLSearchParams(window.location.search)
    let movieID = query.get('movieID')

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=42b65a75bcff9e0cf48e9c9896e3cdfe&language=es-ES`
        axios.get(endPoint)
        .then(response => {
            const movieData = response.data;
            setMovie(movieData)
        })
        .catch(error => {
            swAlert(<h2>Hubo un error, inténtalo de nuevo</h2>)
        })
    }, [movieID]);
    return(
        <>
            {!token && <Navigate to="/" />}
            {!movie && <p>Cargando..</p>}
            {movie && 
            <>
                <h2>Título: {movie.title}</h2>
                <div className="row">
                    <div className="col-4">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movie_post" />

                    </div>
                    <div className="col-8">
                        <h5>Fecha de estreno: {movie.release_date}</h5>
                        <h5>Reseña: </h5>
                        <p>{movie.overview}</p>
                        <h5>Rating: {movie.vote_average}</h5>
                        <h5>Géneros:</h5>
                        <ul>
                            {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                            
                        </ul>
                    </div>
                </div>
            </>
            }
            
        </>
    )
}

export default Detalle