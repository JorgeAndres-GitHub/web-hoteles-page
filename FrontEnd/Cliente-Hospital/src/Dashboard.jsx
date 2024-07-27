import { useEffect, useState } from "react"
import { Header } from "./Header"
import * as API from "./services/data"
import { Link } from "react-router-dom";

export function DashBoard(){
    const [hoteles, setHoteles]=useState([]);
    const [nombreHotel, setNombre]=useState("");
    const [ciudadHotel, setCiudad]=useState("");
    const [estrellasHotel, setEstrellas] =useState(0);
    const [mensaje, setMensaje] = useState("");

    const ciudades = [
        "Madrid",
        "Barcelona",
        "Sevilla",
        "Valencia",
        "Bilbao",
        "Granada",
        "Malaga",
        "Cordoba",
        "Alicante",
        "Tenerife"
    ];
    const estrellas = [1, 2, 3, 4, 5]; 

    async function fetchHoteles(){
        const data= await API.MostrarHoteles();
        setHoteles(data);
    }

    useEffect(()=>{        
        fetchHoteles();
    }, []);

    useEffect(()=>{
        if (nombreHotel || ciudadHotel || estrellasHotel) {
            async function fetchFiltradoHoteles() {
                try {
                    const response = await API.FiltrarHoteles(nombreHotel, ciudadHotel, estrellasHotel);
                    if (!response.exito) {
                        setMensaje(response.mensaje);
                        setHoteles([]);
                    } else {
                        setHoteles(response.datos);
                        setMensaje("");
                    }
                } catch (error) {
                    setMensaje("No se encontraron resultados de busqueda");
                    setHoteles([]);
                }
            }
            if (nombreHotel || ciudadHotel!="" || estrellasHotel) {
                fetchFiltradoHoteles();
            }else{                
                fetchHoteles();
            }
        } else {
            setHoteles([]);
            setMensaje("");
        }
    }, [nombreHotel, ciudadHotel, estrellasHotel])

    function handleRecargar(){
        setNombre("")
        setCiudad("")
        setEstrellas(0)
        setMensaje("")
        fetchHoteles();
    }

    return(
        <>
            <Header/>
            <h1>HOTELES DISPONIBLES</h1>
            <div>
                Nombre del Hotel: <input type="text" value={nombreHotel} onChange={event=>setNombre(event.target.value)}/>
                Ciudad del Hotel<input type='text' list="ciudades" value={ciudadHotel} onChange={event=>setCiudad(event.target.value)}/>
                <datalist id='ciudades'>
                    {ciudades.map(ciudad=>(
                        <option>{ciudad}</option>
                    ))}                    
                </datalist>
                Numero de Estrellas del Hotel: 
                <select value={estrellasHotel} onChange={event=>setEstrellas(event.target.value)}>
                    <option value="0">Sin seleccionar</option>
                    {estrellas.map(estrella=>(
                        <option value={estrella}>{estrella}</option>
                    ))}                    
                </select>
                <span onClick={handleRecargar}>Recargar</span>
            </div>
            
            {mensaje && <p>{mensaje}</p>} {/* Mostrar mensaje si existe */}

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