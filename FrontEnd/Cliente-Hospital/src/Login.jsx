import { useState } from "react";
import * as API from './services/data'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Login(){
    const [cliente, setCliente]=useState({cedula:'', contrasenia:''});
    const navigate=useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        const response= await API.Login(cliente.cedula, cliente.contrasenia);
        if(response.length!=0){
            sessionStorage.setItem("cedula", response);
            alert("Ha iniciado sesion correctamente")
            navigate('/dashboard');
        }else{
            alert("Error al iniciar sesion")
        }
    }

    return (
        <>
            <h1>Inicio de Sesión</h1>
            <form id='form' onSubmit={handleSubmit}>
                Cedula<input type='text' id='cedula' onChange={event=>setCliente({...cliente, cedula:event.target.value})}/><br></br>
                Contraseña<input type='password' id='password' onChange={event=>setCliente({...cliente, contrasenia:event.target.value})}/><br></br>
                <input type='submit' id='enviar' value='Iniciar Sesión'/>
            </form>
            <Link to='/'>
                <span>Crear una nueva cuenta</span>
            </Link>
        </>
    )
}