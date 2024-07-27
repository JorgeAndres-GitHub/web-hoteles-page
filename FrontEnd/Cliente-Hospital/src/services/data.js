const URL_BASE='https://localhost:7247/api/';

export function Login(cedula, contrasenia){
    let datos={cedula:cedula, contrasenia:contrasenia};

    return fetch(URL_BASE+'cliente', {
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
    return fetch(URL_BASE+'insertarCliente', {
        method:'POST',
        body:JSON.stringify(datos),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.text());
}

export function MostrarHoteles(){
    return fetch(URL_BASE+'hoteles',{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.json());
}

export function MostrarSaldo(cedula){
    return fetch(URL_BASE+'dinero?cedula='+cedula,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.text());
}

export function MostrarHabitacionesHotel(idHotel){
    return fetch(URL_BASE+'habitaciones?idHotel='+idHotel,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.json());
}

export function MostrarHotelesCliente(cedula){
    return fetch(URL_BASE+'hotelesCliente?cedula='+cedula,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.json());
}

export function IngresarAlHotel(CantidadPersonas, DiaEntradaMes, DiaEntradaAno, DiaEntradaDia, DiaSalidaMes, DiaSalidaAno, DiaSalidaDia, cedula, idHabitacion){
    let datos={CantidadPersonas, DiaEntradaMes, DiaEntradaAno, DiaEntradaDia, DiaSalidaMes, DiaSalidaAno, DiaSalidaDia};

    return fetch(URL_BASE+'ingresarClienteHotel?cedula='+cedula+'&idHabitacion='+idHabitacion,{
        method:'POST',
        body:JSON.stringify(datos),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.text());
}

export function TipoHabitacion(idHabitacion){
    return fetch(URL_BASE+'habitacion?idHabitacion='+idHabitacion,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.text());
}

export function GetCliente(cedula){
    return fetch(URL_BASE+'cliente?cedula='+cedula,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.json());
}

export function AgregarDinero(cedula, dinero){
    let datos={cedula, dinero}
    return fetch(URL_BASE+'dinero',{
        method:'POST',
        body:JSON.stringify(datos),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data=>data.text());
}

export function ActualizarCliente(cedula, contrasenia, nombre, email, telefono, cedulaActualizada=null){
    let datos={Cedula:cedula, Contrasenia:contrasenia, Nombre:nombre, Email:email, Telefono:telefono}

    let url = URL_BASE + 'cliente';
    if (cedulaActualizada) {
        url += '?cedulaActualizada=' + cedulaActualizada;
    }

    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data=>data.text());     
}

export function FiltrarHoteles(nombre, ciudad, estrellas) {
    let URLCopia = new URL('filtrarHoteles',URL_BASE); 
    
    // Construir los parámetros de la query string
    let params = {};
    if (nombre) params.nombre = nombre;
    if (ciudad) params.ciudad = ciudad;
    if (estrellas) params.estrellas = estrellas;

    // Agregar los parámetros a la URL
    Object.keys(params).forEach(key => URLCopia.searchParams.append(key, params[key]));

    // Realizar la solicitud fetch
    return fetch(URLCopia, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.status===404){
            return { exito: false, mensaje: "No se encontraron resultados" };
        }
        return response.json().then(data => ({ exito: true, datos: data }));
    });        
}