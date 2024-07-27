import { useEffect, useState } from 'react';
import * as API from './services/data'
import { Link, useNavigate } from 'react-router-dom';

export function Header(){
    const [dinero, setDinero]=useState();
    const cedula=sessionStorage.getItem("cedula");
    const navigate=useNavigate();

    useEffect(()=>{        
        async function ObtenerSaldo(){            
            let saldo= await API.MostrarSaldo(cedula);
            setDinero(saldo);
        }
        ObtenerSaldo();        
    }, []);   

    function CerrarSesion(){
        sessionStorage.removeItem("cedula");
        navigate('/');
    }

    return(
        <>
            <div>
                <Link to='/dashboard'>
                    <span>Inicio</span>
                </Link>
                <Link to='/dinero'>
                    <span>{dinero}</span>
                </Link>
                <Link to={'/perfil/'+cedula}>
                    <span>Mi Perfil</span>
                </Link>       
                <span onClick={CerrarSesion}>Cerrar Sesión</span>         
            </div>
        </>
    )
}