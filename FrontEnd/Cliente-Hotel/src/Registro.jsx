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
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios",
                icon: "warning"
              });
            return;
        }

        const response= await API.Registro(cliente.cedula, cliente.contrasenia, cliente.nombre, cliente.email, cliente.telefono);
        if(response=="true"){
            Swal.fire({
                title: "Genial!",
                text: "Se ha registrado correctamente",
                icon: "success"
              });
            navigate('/login')
        }
        else{
            Swal.fire({
                title: "Error",
                text: "Error al realizar el registro",
                icon: "error"
              });
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
                                <Input type="text" id='cedula' onChange={event=>setCliente({...cliente, cedula:event.target.value})}></Input>
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Contraseña</FormLabel>
                                <Input type="password" id='pass' onChange={event=>setCliente({...cliente, contrasenia:event.target.value})}></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Nombre</FormLabel>
                                <Input type="text" id='nombre' onChange={event=>setCliente({...cliente, nombre:event.target.value})}></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" id='email' onChange={event=>setCliente({...cliente, email:event.target.value})}></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Telefono</FormLabel>
                                <Input type="text" id='telefono' onChange={event=>setCliente({...cliente, telefono:event.target.value})}></Input>
                            </FormControl>
                            <FormControl>
                                <Input type="submit" id='enviar' value='Registrar' mt='15px' borderColor='blue'></Input>
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