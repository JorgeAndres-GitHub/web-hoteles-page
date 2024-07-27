import { useParams } from "react-router-dom"
import * as API from './services/data'

export function ReservaDelete(){
    const params =useParams();
    const cedula=sessionStorage.getItem("cedula")

    async function Eliminar(){
        const response=await API.EliminarReserva(cedula, params.idReserva)
        if(response=="true"){
            alert("Se ha eliminado la reserva correctamente, se te ha devuelto un 60% del valor de la compra")
        }else{
            alert("Hubo un error al intentar eliminar la reserva");
        }
    }
    return(
        <>
            <h1>Eliminar Reserva</h1>
            <h2>Esta seguro de que desea eliminar la reserva?</h2>
            <h3>Nota: se te devolvera el 60% del valor pagado</h3>
            <span onClick={Eliminar}>Eliminar</span>
        </>
    )
}