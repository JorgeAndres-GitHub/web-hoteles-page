import { json } from "react-router-dom";

const URL='https://localhost:7247/api/';

export function Login(cedula, contrasenia){
    let datos={cedula:cedula, contrasenia:contrasenia};

    return fetch(URL+'cliente', {
        method:'POST',
        body:JSON.stringify(datos),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.text());
}

export function Registro(cedula, contrasenia, nombre, email, telefono){
    let datos={Cedula:cedula, Contrasenia:contrasenia, Nombre:nombre, Email:email, Telefono:telefono}
    return fetch(URL+'insertarCliente', {
        method:'POST',
        body:JSON.stringify(datos),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.text());
}

export function MostrarHoteles(){
    return fetch(URL+'hoteles',{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.json());
}

export function MostrarSaldo(cedula){
    return fetch(URL+'dinero?cedula='+cedula,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.text());
}

export function MostrarHabitacionesHotel(idHotel){
    return fetch(URL+'habitaciones?idHotel='+idHotel,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.json());
}

export function MostrarHotelesCliente(cedula){
    return fetch(URL+'hotelesCliente?cedula='+cedula,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.json());
}

export function IngresarAlHotel(CantidadPersonas, DiaEntradaMes, DiaEntradaAno, DiaEntradaDia, DiaSalidaMes, DiaSalidaAno, DiaSalidaDia, cedula, idHabitacion){
    let datos={CantidadPersonas, DiaEntradaMes, DiaEntradaAno, DiaEntradaDia, DiaSalidaMes, DiaSalidaAno, DiaSalidaDia};

    return fetch(URL+'ingresarClienteHotel?cedula='+cedula+'&idHabitacion='+idHabitacion,{
        method:'POST',
        body:JSON.stringify(datos),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.text());
}

export function TipoHabitacion(idHabitacion){
    return fetch(URL+'habitacion?idHabitacion='+idHabitacion,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.text());
}

export function GetCliente(cedula){
    return fetch(URL+'cliente?cedula='+cedula,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.json());
}

export function AgregarDinero(cedula, dinero){
    let datos={cedula, dinero}
    return fetch(URL+'dinero',{
        method:'POST',
        body:JSON.stringify(datos),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.text());
}