import { useEffect, useState } from "react"
import * as API from './services/data'
import { Header } from "./Header";

export function Perfil(){
    const [hoteles, setHoteles]=useState([]);
    const [cliente, setCliente]=useState([]);
    const cedula =sessionStorage.getItem("cedula");
    
    useEffect(()=>{
        async function ObtenerCliente(){
            const clienteRecibido=await API.GetCliente(cedula);
            setCliente(clienteRecibido);
        }
        
        async function ObtenerHoteles(){
            const data=await API.MostrarHotelesCliente(cedula);
            setHoteles(data);
        }
        ObtenerCliente();
        ObtenerHoteles();
    }, [])
    
    return(
        <>
            <Header/>
            <h1>Perfil</h1>
            <div>
                <h2>Cedula: </h2> <h3>{cliente.cedula}</h3>
                <h2>Nombre: </h2> <h3>{cliente.nombre}</h3>
                <h2>Email: </h2> <h3>{cliente.email}</h3>
                <h2>Telefono: </h2> <h3>{cliente.telefono}</h3>
            </div>
            <div className="hoteles-container2">
                <h2>HOTELES RESERVADOS</h2>
                {hoteles.map(hotel=>(
                    <div className="hotel-box2">
                        <h2>{hotel.nombre}</h2>
                        <p>{hotel.direccion}</p>
                        <p>{hotel.ciudad}</p>
                        <p>{hotel.numeroEstrellas}</p>
                        <p>{hotel.numeroHabitacion}</p>
                        <p>{hotel.tipo}</p>
                        <p>{hotel.fechaEntrada}</p>
                        <p>{hotel.fechaSalida}</p>
                        <p>{hotel.precioTotal}</p>
                    </div>
                ))}
            </div>
        </>
    )
}