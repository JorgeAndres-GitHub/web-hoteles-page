import { useState } from 'react';
import * as API from './services/data';
import imagen from './assets/visa.jpg';
import imagen2 from './assets/paypal.png';
import { Header } from './Header';

export function Dinero(){
    const cedula=sessionStorage.getItem("cedula");
    const [dinero, setDinero]=useState();

    async function handleSubmit(e){
        e.preventDefault();
        const response=await API.AgregarDinero(cedula, dinero);
        if(response=="true"){
            alert("Se ha agregado el dinero correctamente a tu cuenta");
        }else{
            alert("Hubo un error al intentar agregar dinero a la cuenta");
        }
    }

    return(
        <>
            <Header/>
            <h1>Agregar Dinero a la Cuenta</h1>
            <form id='form' onSubmit={handleSubmit}>
                Metodo de pago:<br></br>
                VISA<input type='radio' name='paymentMethod' value='visa'/><img src={imagen} width='50px'></img><br></br>
                PayPal<input type='radio' name='paymentMethod' value='paypal'/><img src={imagen2} width='50px'/><br></br>
                <label>
                    Valor a ingresar: <input type='number' step='0.01' value={dinero} onChange={event=>setDinero(event.target.value)}></input>
                </label><br></br>                
                <input type='submit' id='Subir'></input>
            </form>
        </>
    )
}