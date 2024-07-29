import { useEffect, useState } from 'react';
import * as API from './services/data'
import { Link, useNavigate } from 'react-router-dom';
import { Box, Flex, HStack } from '@chakra-ui/react';
import { FaHotel } from "react-icons/fa6";

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
            <Flex w='100%' p='6px' align='center' justify='space-between' bgGradient='linear(to-r, teal.500, green.500)' color='white'>
                <HStack as='nav' spacing='10px'>                    
                    <Link to='/dashboard'>
                        <Flex  _hover={{color:"gray.300"}}>
                            <FaHotel size={20}/>
                            <Box ml='20px'>Inicio</Box>
                        </Flex>
                    </Link>
                </HStack>  
                <HStack as='nav'>
                    <Link to='/dinero'>
                        <Box _hover={{color:"gray.300"}}>{dinero}</Box>
                    </Link>
                    <Link to={'/perfil/'+cedula}>
                        <Box _hover={{color:"gray.300"}}>Mi Perfil</Box>
                    </Link>       
                    <Box mr='20px' cursor='pointer' _hover={{color:"gray.300"}} onClick={CerrarSesion}>Cerrar Sesión</Box>      
                </HStack> 
            </Flex>
        </>
    )
}