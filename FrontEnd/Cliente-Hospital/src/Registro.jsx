import { useState } from "react"
import * as API from './services/data'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Center, FormControl, FormLabel, Heading, Input, LinkBox } from "@chakra-ui/react";
import { FaHotel } from "react-icons/fa6";


export function Registro(){
    const [cliente, setCliente]=useState({cedula:'', contrasenia:'', nombre:'', email:'', telefono:''})
    const navigate=useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        if (!cliente.cedula || !cliente.contrasenia || !cliente.nombre || !cliente.email || !cliente.telefono) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const response= await API.Registro(cliente.cedula, cliente.contrasenia, cliente.nombre, cliente.email, cliente.telefono);
        if(response=="true"){
            navigate('/login')
        }
        else{
            alert("Error al realizar el registro")
        }
    }

    return(
        <>
            <Box mt='100px'>
                <Center>
                    <Heading>REGISTRO DE CLIENTE</Heading>
                </Center>
                <Center>
                    <Box p='20px' boxShadow='xl' borderRadius='md' width='35%'>
                        <Center>
                            <FaHotel size={100}/>
                        </Center>   
                        <form id='formulario' onSubmit={handleSubmit}>
                            <FormControl mt='25px'>
                                <FormLabel>Cedula</FormLabel>
                                <Input type="text" id='cedula' required onChange={event=>setCliente({...cliente, cedula:event.target.value})}></Input>
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Contraseña</FormLabel>
                                <Input type="password" id='pass' required onChange={event=>setCliente({...cliente, contrasenia:event.target.value})}></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Nombre</FormLabel>
                                <Input type="text" id='nombre' required onChange={event=>setCliente({...cliente, nombre:event.target.value})}></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" id='email' required onChange={event=>setCliente({...cliente, email:event.target.value})}></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Telefono</FormLabel>
                                <Input type="text" id='telefono' required onChange={event=>setCliente({...cliente, telefono:event.target.value})}></Input>
                            </FormControl>
                            <FormControl>
                                <Input type="submit" id='enviar' value='Registrar' mt='5px' borderColor='blue'></Input>
                            </FormControl>
                        </form>
                    </Box>
                    
                </Center>
                <Center>
                    <Box mt='5px'>
                        <Link to={'/login'}>
                            <LinkBox>Ya tengo una cuenta</LinkBox>
                        </Link>   
                    </Box>  
                </Center>
            </Box>       
        </>
    )
}