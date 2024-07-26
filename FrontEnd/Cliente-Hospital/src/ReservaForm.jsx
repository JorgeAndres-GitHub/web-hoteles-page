import { useEffect, useState } from "react"
import { Header } from "./Header";
import { useParams } from "react-router-dom";
import * as API from './services/data'

export function ReservaForm(){
    let params=useParams();
    const cedula=sessionStorage.getItem("cedula");
    const [cantidadPersonas, setCantidadPersonas] = useState();
    const [cantidadPersonasOpciones, setCantidadPersonasOpciones] =useState([])
    const [diaEntrada, setDiaEntrada] =useState("");
    const [mesEntrada, setMesEntrada]= useState("");
    const [anoEntrada, setAnoEntrada] =useState("");
    const [diaSalida, setDiaSalida] =useState("");
    const [mesSalida, setMesSalida] =useState("");
    const [anoSalida, setAnoSalida]=useState("");

    const dias = Array.from({ length: 31 }, (_, i) => i + 1);
    const meses = [
        "1", "2", "3", "4", "5", "6",
        "7", "8", "9", "10", "11", "12"
    ]; 
    const anos = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() + i);

    useEffect(()=>{
        async function SetearHabitaciones(){
            const tipo= await API.TipoHabitacion(params.idHabitacion)
            if(tipo==='Sencilla'){
                setCantidadPersonasOpciones([1 ,2 ]);
            }else if(tipo==='Doble'){
                setCantidadPersonasOpciones([1, 2, 3, 4]);
            }else{
                setCantidadPersonasOpciones([1, 2, 3, 4, 5, 6]);
            }
        }
        SetearHabitaciones();
    }, [params.idHabitacion])


    async function handleSubmit(e){
        e.preventDefault();
        const response= await API.IngresarAlHotel(cantidadPersonas, mesEntrada, anoEntrada, diaEntrada, mesSalida, anoSalida, diaSalida, cedula, params.idHabitacion);
        if(response=="true"){
            return alert("Se ha reservado la habitación correctamente. Revise su correo, le llegara un archivo con los datos de su reserva");
        }
        return alert("No se ha podido reservar la habitación");
    }

    return(
        <>
            <Header/>
            <form id='formulario' onSubmit={handleSubmit}>
                <h1>Reserva de habitación</h1>
                <h3>Fecha de entrada</h3>
                <label>
                    Dia:
                    <select value={diaEntrada} onChange={event=>setDiaEntrada(event.target.value)}>
                        <option value="">Seleccionar Dia</option>
                        {dias.map(dia=>(
                            <option key={dia} value={dia}>{dia}</option>
                        ))}
                    </select>
                    Mes:
                    <select value={mesEntrada} onChange={event=>setMesEntrada(event.target.value)}>
                        <option value="">Seleccionar Mes</option>
                        {meses.map(mes=>(
                            <option key={mes} value={mes}>{mes}</option>
                        ))}
                    </select>
                    Año:
                    <select value={anoEntrada} onChange={event=>setAnoEntrada(event.target.value)}>
                        <option value="">Seleccionar Año</option>
                        {anos.map(ano=>(
                            <option key={ano} value={ano}>{ano}</option>
                        ))}
                    </select>
                </label>
                <h3>Fecha de salida</h3>
                <label>
                    Dia:
                    <select value={diaSalida} onChange={event=>setDiaSalida(event.target.value)}>
                        <option value="">Seleccionar Dia</option>
                        {dias.map(dia=>(
                            <option key={dia} value={dia}>{dia}</option>
                        ))}
                    </select>
                    Mes:
                    <select value={mesSalida} onChange={event=>setMesSalida(event.target.value)}>
                        <option value="">Seleccionar Mes</option>
                        {meses.map(mes=>(
                            <option key={mes} value={mes}>{mes}</option>
                        ))}
                    </select>
                    Año:
                    <select value={anoSalida} onChange={event=>setAnoSalida(event.target.value)}>
                        <option value="">Seleccionar Año</option>
                        {anos.map(ano=>(
                            <option key={ano} value={ano}>{ano}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <h3>Cantidad de Personas:</h3>
                    <select value={cantidadPersonas} onChange={event=>setCantidadPersonas(event.target.value)}>
                        <option value="">Seleccionar cantidad</option>
                        {cantidadPersonasOpciones.map(cantidad=>(
                            <option key={cantidad} value={cantidad}>{cantidad}</option>
                        ))}
                    </select>
                </label><br></br>
                <input type="submit" id='insertar' value='Reservar'/>
            </form>
            
            
        </>
    )
}