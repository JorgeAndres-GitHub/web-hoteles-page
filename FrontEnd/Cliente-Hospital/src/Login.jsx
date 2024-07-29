import { useState } from "react";
import * as API from './services/data'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Center, Collapse, FormControl, FormLabel, Heading, Input, LinkBox, Spinner, useDisclosure } from "@chakra-ui/react";
import { FaHotel } from "react-icons/fa6";

export function Login(){
    const [cliente, setCliente]=useState({cedula:'', contrasenia:''});
    const navigate=useNavigate();
    const {isOpen, onToggle}=useDisclosure();

    async function handleSubmit(e){
        e.preventDefault();
        onToggle();
        const response= await API.Login(cliente.cedula, cliente.contrasenia);
        if(response.length!=0){
            sessionStorage.setItem("cedula", response);
            alert("Ha iniciado sesion correctamente")
            navigate('/dashboard');
        }else{
            alert("Error al iniciar sesion")
        }
    }

    return (
        <>
            <Box mt='150px'>
                <Center>
                    <Heading mt='10'>Inicio de Sesión</Heading>
                </Center>                               
                <Center>                    
                    <Box boxShadow='xl' borderRadius='md' width='40%' p='20px'>
                        <Center>
                            <FaHotel size={100}/>
                        </Center>                        
                        <form id='form' onSubmit={handleSubmit}>
                            <FormControl mt='35px'>
                                <Center>
                                    <FormLabel>Cedula</FormLabel>
                                </Center>
                                <Input type="text" id='cedula' required onChange={event=>setCliente({...cliente, cedula:event.target.value})}></Input>
                            </FormControl>
                            <FormControl mt='5px'>
                                <Center>
                                    <FormLabel>Contraseña</FormLabel>
                                </Center>
                                <Input type="password" id='password' required onChange={event=>setCliente({...cliente, contrasenia:event.target.value})}></Input>
                            </FormControl>
                            <FormControl mt='20px'>
                                <Input type="submit" id='enviar' value='Iniciar Sesión' borderColor='blue'></Input>
                            </FormControl>
                        </form>
                    </Box>
                </Center>
                <Collapse in={isOpen} animateOpacity>
                    <Center mt='4'>
                        <Box>
                            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'></Spinner>
                        </Box>
                    </Center>
                </Collapse>
            </Box>
            <Center>
                <Link to='/'>
                    <LinkBox mt='10px'>Crear una nueva cuenta</LinkBox>
                </Link>
            </Center>
        </>
    )
}