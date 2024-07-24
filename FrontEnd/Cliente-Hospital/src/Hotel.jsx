import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as API from './services/data';
import { Header } from "./Header";

export function Hotel(){
    let params=useParams();
    const [habitaciones, setHabitaciones]=useState([]);

    useEffect(()=>{
        async function fetchHabitaciones(){
            const data=await API.MostrarHabitacionesHotel(params.hotelId);
            setHabitaciones(data)
        }
        fetchHabitaciones();
    }, [])

    return (
        <>
            <Header/>
            <div>
                {habitaciones.map(habitacion=>(
                    <div>
                        Numero de habitacion: <span>{habitacion.numeroHabitacion}</span><br></br>
                        Tipo: <span>{habitacion.tipo}</span><br></br>
                        Precio por noche: <span>{habitacion.precioNoche}</span><br></br>                   
                    </div>
                ))}
            </div>
        </>
    )
}