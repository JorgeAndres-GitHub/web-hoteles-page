import { useState } from "react"
import * as API from './services/data'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Registro(){
    const [cliente, setCliente]=useState({cedula:'', contrasenia:'', nombre:'', email:'', telefono:''})
    const navigate=useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        if (!cliente.cedula || !cliente.contrasenia || !cliente.nombre || !cliente.email || !cliente.telefono) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const response= await API.Registro(cliente.cedula, cliente.contrasenia, cliente.nombre, cliente.email, cliente.telefono);
        if(response=="true"){
            navigate('/login')
        }
        else{
            alert("Error al realizar el registro")
        }
    }

    return(
        <>
            <h1>REGISTRO DE CLIENTE</h1>
            <form id='formulario' onSubmit={handleSubmit}>
                Cedula<input type='text' id='cedula' onChange={event=>setCliente({...cliente, cedula:event.target.value})}/><br></br>
                Contraseña<input type='password' id='pass' onChange={event=>setCliente({...cliente, contrasenia:event.target.value})}/><br></br>
                Nombre<input type='text' id='nombre' onChange={event=>setCliente({...cliente, nombre:event.target.value})}/><br></br>
                Email<input type='text' id='email' onChange={event=>setCliente({...cliente, email:event.target.value})}/><br></br>
                Telefono<input type='text' id='telefono' onChange={event=>setCliente({...cliente, telefono:event.target.value})}/><br></br>
                <input type='submit' id='enviar' value='Registrar'/><br></br>
            </form>
            <Link to={'/login'}>
                <span>Ya tengo una cuenta</span>
            </Link>            
        </>
    )
}