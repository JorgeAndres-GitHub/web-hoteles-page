import { useEffect, useState } from "react"
import * as API from './services/data'

export function Perfil(){
    const [hoteles, setHoteles]=useState([]);
    const cedula =sessionStorage.getItem("cedula");

    useEffect(()=>{
        async function ObtenerHoteles(){
            const data=await API.MostrarHotelesCliente(cedula);
            setHoteles(data);
        }
        ObtenerHoteles();
    }, [])
    return(
        <>
            <h1>Perfil</h1>
            <div className="hoteles-container">
                {hoteles.map(hotel=>(
                    <div className="hotel-box">
                        <h2>{hotel.nombre}</h2>
                        <p>{hotel.direccion}</p>
                        <p>{hotel.ciudad}</p>
                        <p>{hotel.numeroEstrellas}</p>
                    </div>
                ))}
            </div>
        </>
    )
}