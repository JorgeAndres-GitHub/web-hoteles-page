import { useEffect, useState } from "react"
import * as API from './services/data'
import { Header } from "./Header";
import { Link } from "react-router-dom";

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
            <Link to={'/actualizarDatos'}>
                <span>Actualizar Datos Personales</span>
            </Link>

            <div className="hoteles-container2">
                <h2>HOTELES RESERVADOS</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Direccion</th>
                            <th>Ciudad</th>
                            <th>Numero De Estrellas</th>
                            <th>Numero de Habitación</th>
                            <th>Tipo de habitación</th>
                            <th>Fecha de entrada</th>
                            <th>Fecha de salida</th>
                            <th>Precio total</th>
                            <th></th>
                        </tr>                        
                    </thead>
                    <tbody>
                        {hoteles?.map(hotel=>(
                            <tr key={hotel.reservaId}>
                                <td>{hotel.nombre}</td>
                                <td>{hotel.direccion}</td>
                                <td>{hotel.ciudad}</td>
                                <td>{hotel.numeroEstrellas}</td>
                                <td>{hotel.numeroHabitacion}</td>
                                <td>{hotel.tipo}</td>
                                <td>{hotel.fechaEntrada}</td>
                                <td>{hotel.fechaSalida}</td>
                                <td>{hotel.precioTotal}</td>
                                <td>                                    
                                    <Link to={'/reservaDelete/'+hotel.reservaId}>
                                        <span>Eliminar Reserva</span>
                                    </Link>                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}