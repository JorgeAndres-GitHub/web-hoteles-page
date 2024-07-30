import { useState } from "react"
import * as API from './services/data'
import { useNavigate } from "react-router-dom";
import { Box, FormControl, FormLabel, Heading, Input, Text, Center } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaHotel } from "react-icons/fa6";

export function DatosActualizados(){
    const [cedula, setCedula]=useState("");
    const [contrasenia, setContrasenia] =useState("");
    const [nombre, setNombre] = useState("");
    const [email, setEmail] =useState("");
    const [telefono, setTelefono] =useState("");

    const navigate=useNavigate();

    function Regresar(){
        navigate('/perfil/'+sessionStorage.getItem("cedula"));
    }

    async function handleSubmit(e){
        e.preventDefault();
        const cedulaLogin=sessionStorage.getItem("cedula");
        let response;

        if(cedulaLogin!=cedula){
            response= await API.ActualizarCliente(cedulaLogin, contrasenia, nombre, email, telefono, cedula);
            sessionStorage.setItem("cedula", cedula);
        }else{
            response= await API.ActualizarCliente(cedulaLogin, contrasenia, nombre, email, telefono);
        }
        
        if(response==="true"){
            Swal.fire({
                title: "Datos Actualizados",
                text: "Se han actualizado los datos correctamente",
                icon: "success"
            });              
        }else{
            Swal.fire({
                title: "Error",
                text: "Hubo un error al actualizar los datos",
                icon: "error"
            });
        }
    }

    return(
        <>      
            <Box minH="100vh" bgGradient="linear(to-r, #B3E5FC, #E1BEE7)" >            
                <Box ml='20px' onClick={Regresar} _hover={{color:"green.300"}} cursor='pointer'><IoMdArrowRoundBack size={40}/></Box>
                <Center><FaHotel size={100}/></Center>     
                <Center>
                    <Box boxShadow='2xl' borderRadius='md' p='10px' w='30%' mt='20px' bgGradient="linear(to-r, #FFECB3, #F8BBD0)">           
                        <Center>
                            <Heading mt='40px' textAlign='center'>ACTUALIZACIÓN DE DATOS</Heading>
                        </Center>                        
                        <Center>
                            <Text mt='20px' width='70%' textAlign='center'>Nota: Puede ingresar los mismos datos en los campos que no hayan cambiado</Text>
                        </Center>
                        <Center>
                            <Box w='90%' mt='20px'>
                                <form id='formulario' onSubmit={handleSubmit}> 
                                    <FormControl mt='5px'>
                                        <FormLabel>Cedula: </FormLabel>
                                        <Input color='purple' bgGradient="linear(to-r, #FFDEE9, #B5FFFC)" type="text" required value={cedula} onChange={event=>setCedula(event.target.value)}></Input>
                                    </FormControl>
                                    <FormControl mt='5px'>
                                        <FormLabel>Contraseña: </FormLabel>
                                        <Input color='purple' bgGradient="linear(to-r, #FFDEE9, #B5FFFC)" type="password" required value={contrasenia} onChange={event=>setContrasenia(event.target.value)}></Input>
                                    </FormControl>
                                    <FormControl mt='5px'>
                                        <FormLabel>Nombre: </FormLabel>
                                        <Input color='purple' bgGradient="linear(to-r, #FFDEE9, #B5FFFC)" type="text" required value={nombre} onChange={event=>setNombre(event.target.value)}></Input>
                                    </FormControl>
                                    <FormControl mt='5px'>
                                        <FormLabel>Email: </FormLabel>
                                        <Input color='purple' bgGradient="linear(to-r, #FFDEE9, #B5FFFC)" type='text' required value={email} onChange={event=>setEmail(event.target.value)}></Input>
                                    </FormControl>
                                    <FormControl mt='5px'>
                                        <FormLabel>Telefono: </FormLabel>
                                        <Input color='purple' bgGradient="linear(to-r, #FFDEE9, #B5FFFC)" type="text" required value={telefono} onChange={event=>setTelefono(event.target.value)}></Input>
                                    </FormControl>
                                    <FormControl>
                                        <Input mt='20px' type="submit" value='Actualizar Datos' bgGradient='linear(to-r, teal.500, green.500)' _hover={{bgGradient: 'linear(to-r, red.500, yellow.500)',}}></Input>
                                    </FormControl>                                
                                </form>
                            </Box>
                        </Center>
                    </Box>   
                </Center>
            </Box>
        </>
    )
}