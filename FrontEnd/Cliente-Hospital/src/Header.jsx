import { useEffect, useState } from 'react';
import * as API from './services/data'
import { Link } from 'react-router-dom';

export function Header(){
    const [dinero, setDinero]=useState();
    const cedula=sessionStorage.getItem("cedula");

    useEffect(()=>{        
        async function ObtenerSaldo(){            
            let saldo= await API.MostrarSaldo(cedula);
            setDinero(saldo);
        }
        ObtenerSaldo();        
    }, []);   

    return(
        <>
            <div>
                <Link to='/dashboard'>
                    <span>Inicio</span>
                </Link>
                <Link>
                    <span>{dinero}</span>
                </Link>
                <Link to={'/perfil/'+cedula}>
                    <span>Mi Perfil</span>
                </Link>                
            </div>
        </>
    )
}