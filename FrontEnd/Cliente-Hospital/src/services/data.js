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