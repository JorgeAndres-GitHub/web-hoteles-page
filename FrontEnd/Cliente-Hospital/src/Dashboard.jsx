import { useEffect, useState } from "react"
import { Header } from "./Header"
import * as API from "./services/data"
import { Link } from "react-router-dom";

export function DashBoard(){
    const [hoteles, setHoteles]=useState([]);

    useEffect(()=>{
        async function fetchHoteles(){
            const data= await API.MostrarHoteles();
            setHoteles(data);
        }
        fetchHoteles();
    }, []);

    return(
        <>
            <Header/>
            <div className="hoteles-container">
                {hoteles.map(hotel=>(
                    <Link to={'/hotel/'+hotel.id} key={hotel.id}>
                        <div className="hotel-box">
                            <h2>{hotel.nombre}</h2>
                            <p>{hotel.direccion}</p>
                            <p>{hotel.ciudad}</p>
                            <p>{hotel.numeroEstrellas}</p>
                        </div>
                    </Link>                    
                ))}
            </div>
        </>
    )
}