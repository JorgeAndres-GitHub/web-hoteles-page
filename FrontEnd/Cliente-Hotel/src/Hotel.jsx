import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as API from './services/data';
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import { Box, Button, Center, Container, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import sencilla from './assets/sencilla.jpg';
import doble from './assets/doble.jpg';
import suite from './assets/suite.avif'

export function Hotel(){
    let params=useParams();
    const navigate=useNavigate();
    const [habitaciones, setHabitaciones]=useState([]);

    const habitacionImages={
        "Sencilla": sencilla,
        "Doble": doble,
        "Suite":suite
    }

    useEffect(()=>{
        async function fetchHabitaciones(){
            const data=await API.MostrarHabitacionesHotel(params.hotelId);
            setHabitaciones(data)
        }
        fetchHabitaciones();
    }, [])

    async function Reservar(id){
        navigate('/reserva/'+id)        
    }

    return (
        <>
            <Header/>
            <Box minH='100vh' bg='#FFFFF4'>
                <Center >
                    <Heading>
                        <Text>Habitaciones</Text>
                    </Heading>
                </Center>            
                <SimpleGrid columns={{sm:1, md:2, lg:2}} spacing='20px'>       
                    {habitaciones.map(habitacion=>(
                        <Box boxShadow='xl' borderRadius='md' p='20px' mt='30px'>
                            <Image src={habitacionImages[habitacion.tipo]} w='100%' h='600'></Image>
                            <Text mt='15px' align='center'>Numero de habitacion: {habitacion.numeroHabitacion}</Text>
                            <Text align='center'>Tipo: {habitacion.tipo}</Text>
                            <Text align='center'>Precio por noche: {habitacion.precioNoche}</Text>
                            <Button onClick={() => Reservar(habitacion.id)} w='100%' mt='20px' bgGradient="linear(to-r, #D6BCFA, #C6F6D5)" _hover={{
                                        bgGradient: "linear(to-r, teal.500, green.500)",
                                        transform: "scale(1.03)",
                                        transition: "transform 0.2s ease-in-out"
                                    }}>
                                Reservar Habitación    
                            </Button>                   
                        </Box>
                    ))}                    
                </SimpleGrid>
            </Box>
        </>
    )
}