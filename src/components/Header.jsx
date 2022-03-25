import { Link } from "react-router-dom"
import '../css/Header.css'
import Buscador from "./Buscador"


function Header(){
    return(
        <header>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
               <div className="container">
                   <Link className="navbar-brand" to="/" >MovieFlix</Link>
                   <button className="navbar-toggler" type="button" data-bs-toogle="collapse" data-bs-target="#navbarNav"
                   aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
                       <span className="navbar-toggler-icon"></span>
                   </button>
                   <div className="collapse navbar-collapse" id="navbarNav" >
                       <ul className="navbar-nav">
                           <li className="nav-item">
                               <Link className="nav-link" to="/" >Home</Link>
                           </li>
                           <li className="nav-item">
                               <Link className="nav-link" to="/listado" >Listado</Link>
                           </li>
                       </ul>
                   </div>
                <Buscador/>           
               </div>
            </nav>      
        </header>
    )
}

export default Header