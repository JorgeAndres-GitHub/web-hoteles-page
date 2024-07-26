import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as API from './services/data';
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";

export function Hotel(){
    let params=useParams();
    const navigate=useNavigate();
    const [habitaciones, setHabitaciones]=useState([]);

    useEffect(()=>{
        async function fetchHabitaciones(){
            const data=await API.MostrarHabitacionesHotel(params.hotelId);
            setHabitaciones(data)
        }
        fetchHabitaciones();
    }, [])

    async function Reservar(id){
        navigate('/reserva/'+id)        
    }

    return (
        <>
            <Header/>
            <div>
                {habitaciones.map(habitacion=>(
                    <div>
                        Numero de habitacion: <span>{habitacion.numeroHabitacion}</span><br></br>
                        Tipo: <span>{habitacion.tipo}</span><br></br>
                        Precio por noche: <span>{habitacion.precioNoche}</span><br></br>
                        <button onClick={() => Reservar(habitacion.id)}>
                            Reservar Habitación    
                        </button>                   
                    </div>
                ))}
            </div>
        </>
    )
}