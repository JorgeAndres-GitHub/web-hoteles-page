import { useEffect, useState } from "react"
import * as API from './services/data'
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { Box, Center, Flex, Heading, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { IoTrashBin } from "react-icons/io5";
import { MdSystemUpdateAlt } from "react-icons/md";
import { Tooltip } from '@chakra-ui/react';

export function Perfil(){
    const [hoteles, setHoteles]=useState([]);
    const [cliente, setCliente]=useState([]);
    const cedula =sessionStorage.getItem("cedula");

    async function ReservaEliminar(reservaId){
        const result= await Swal.fire({
            title: "Esta seguro de que desea eliminar la reserva?",
            text: "No sera capaz de revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, estoy seguro"
        });
        if (result.isConfirmed) {
            const response=await API.EliminarReserva(cedula, reservaId)
            if(response=="true"){
                Swal.fire({
                    title: "Eliminado",
                    text: "Tu reserva ha sido eliminada, se te ha devuelto un 60% del valor de la compra",
                    icon: "success"
                });
            }else{
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error al intentar eliminar la reserva",
                    icon: "error"
                });
            }            
        }
          
    }
    
    useEffect(()=>{
        async function ObtenerCliente(){
            const clienteRecibido=await API.GetCliente(cedula);
            setCliente(clienteRecibido);
        }
        
        async function ObtenerHoteles(){
            const data=await API.MostrarHotelesCliente(cedula);
            setHoteles(data);
        }
        ObtenerCliente();
        ObtenerHoteles();
    })
    
    return(
        <>
            <Header/>
            <Box minH='100vh' bgGradient='linear(to-r, #D6BCFA, #C6F6D5)'>
                <Center>
                    <Heading mt='20px'>Perfil</Heading>
                </Center>
                <Center>
                    <Box mt='20px'>                
                        <Flex>
                            <Text fontWeight='bold' fontSize='15'>Cedula: </Text> 
                            <Text ml='5px'>{cliente.cedula}</Text>
                        </Flex>
                        <Flex>
                            <Text fontWeight='bold' fontSize='15'>Nombre: </Text> 
                            <Text ml='5px'>{cliente.nombre}</Text>
                        </Flex>
                        <Flex>
                            <Text fontWeight='bold' fontSize='15'>Email: </Text> 
                            <Text ml='5px'>{cliente.email}</Text>
                        </Flex>
                        <Flex>
                            <Text fontWeight='bold' fontSize='15'>Telefono: </Text> 
                            <Text ml='5px'>{cliente.telefono}</Text>
                        </Flex>
                    </Box>
                </Center>  
                <Center>
                    <Tooltip label='Actualizar datos personales' placement='top'>
                        <Link to={'/actualizarDatos'}>
                            <Box mt='20px'><MdSystemUpdateAlt/></Box>
                        </Link>
                    </Tooltip>
                </Center>

                <Box className="hoteles-container2">
                    <Center fontWeight='bold' fontSize='20'>
                        <Text mt='30px'>MIS RESERVAS</Text>          
                    </Center>      
                    <Center>
                        <Table size='md' variant='striped' colorScheme="teal" mt='20px' width='98%'>
                            <Thead>
                                <Tr>
                                    <Th>Nombre</Th>
                                    <Th>Direccion</Th>
                                    <Th>Ciudad</Th>
                                    <Th>Numero De Estrellas</Th>
                                    <Th>Numero de Habitación</Th>
                                    <Th>Tipo de habitación</Th>
                                    <Th>Fecha de entrada</Th>
                                    <Th>Fecha de salida</Th>
                                    <Th>Precio total</Th>
                                    <Th></Th>
                                </Tr>                        
                            </Thead>
                            <Tbody>
                                {hoteles?.map(hotel=>(
                                    <Tr key={hotel.reservaId}>
                                        <Td>{hotel.nombre}</Td>
                                        <Td>{hotel.direccion}</Td>
                                        <Td>{hotel.ciudad}</Td>
                                        <Td>{hotel.numeroEstrellas}</Td>
                                        <Td>{hotel.numeroHabitacion}</Td>
                                        <Td>{hotel.tipo}</Td>
                                        <Td>{hotel.fechaEntrada}</Td>
                                        <Td>{hotel.fechaSalida}</Td>
                                        <Td>{hotel.precioTotal}</Td>
                                        <Td>         
                                            <Tooltip label='Eliminar reserva' placement="top">      
                                                <Box cursor='pointer' onClick={()=>ReservaEliminar(hotel.reservaId)}><IoTrashBin /></Box>
                                            </Tooltip>                                   
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Center>
                </Box>
            </Box>
        </>
    )
}