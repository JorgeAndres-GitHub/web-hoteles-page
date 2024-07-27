import { useState } from "react"
import * as API from './services/data'
import { useNavigate } from "react-router-dom";

export function DatosActualizados(){
    const [cedula, setCedula]=useState("");
    const [contrasenia, setContrasenia] =useState("");
    const [nombre, setNombre] = useState("");
    const [email, setEmail] =useState("");
    const [telefono, setTelefono] =useState("");

    const navigate=useNavigate();

    function Regresar(){
        navigate('/perfil/'+sessionStorage.getItem("cedula"));
    }

    async function handleSubmit(e){
        e.preventDefault();
        const cedulaLogin=sessionStorage.getItem("cedula");
        let response;

        if(cedulaLogin!=cedula){
            response= await API.ActualizarCliente(cedulaLogin, contrasenia, nombre, email, telefono, cedula);
            sessionStorage.setItem("cedula", cedula);
        }else{
            response= await API.ActualizarCliente(cedulaLogin, contrasenia, nombre, email, telefono);
        }
        
        if(response==="true"){
            alert("Se han actualizado los datos correctamente");
        }else{
            alert("Hubo un error al actualizar los datos");
        }
    }

    return(
        <>
            <div>
                <span onClick={Regresar}>Atras</span>
                <h1>ACTUALIZACION DE DATOS</h1>
            </div>
            
            <h4>Nota: Puede ingresar los mismos datos en los campos que no hayan cambiado</h4>
            <form id='formulario' onSubmit={handleSubmit}> 
                Cedula: <input type="text" required value={cedula} onChange={event=>setCedula(event.target.value)}/><br></br>
                Contraseña: <input type="password" required value={contrasenia} onChange={event=>setContrasenia(event.target.value)}/><br></br>
                Nombre: <input type="text" required value={nombre} onChange={event=>setNombre(event.target.value)}/><br></br>
                Email: <input type='text' required value={email} onChange={event=>setEmail(event.target.value)}/><br></br>
                Telefono: <input type="text" required value={telefono} onChange={event=>setTelefono(event.target.value)}/><br></br>
                <input type="submit"/>
            </form>
        </>
    )
}