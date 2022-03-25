import axios from 'axios';
import swAlert from '@sweetalert/with-react'
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(regexEmail.test(email))

    if (email === "" || password === "") {
      swAlert(<h2>Los campos no pueden estar vacios</h2>)
      return;
    };

    if (email !== ''&& !regexEmail.test(email)){
        swAlert(<h2>Debes escribir una dirección de correo electronico valida</h2>)
        return
    }

    if (email !== 'challenge@alkemy.org' || password !== 'react'){
        swAlert(<h2> Credenciales invalidas</h2>)
        return
    }

    axios.post('http://challenge-react.alkemy.org' , {email, password})
         .then(res => {
             swAlert( <h2>Perfecto, ingresaste correctamente</h2> )
             const tokenRecibido = res.data.token
             sessionStorage.setItem('token' , tokenRecibido)
             navigate('/listado')
         })         

}
let token = sessionStorage.getItem("token")

  return (
    <>
      {token && <Navigate replace to="listado" />}
      <h2>Formulario de Login</h2>
      <form className='col-4' onSubmit={submitHandler}>
        <label className='form-label d-block mt-2'>
          <span>Correo electrónico:</span> <br />
          <input className='form-control' type="email" name="email" />
        </label>
        <br />
        <label className='form-label d-block mt-2' >
          <span>Contraseña:</span> <br />
          <input className='form-control' type="password" name="password" />
        </label>
        <br />
        <button className='btn btn-success mt-2'type="submit">Ingresar</button>
      </form>
    </>
  );
}

export default Login;
