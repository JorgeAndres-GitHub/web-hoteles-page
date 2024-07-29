import { useEffect, useState } from "react"
import { Header } from "./Header"
import * as API from "./services/data"
import { Link } from "react-router-dom";
import { Box, Button, Center, Container, Flex, Heading, Image, Input, Select, SimpleGrid, Text } from "@chakra-ui/react";
import hotel1 from './assets/hotel1.jpeg'
import hotel2 from './assets/hotel2.jpg'
import hotel3 from './assets/hotel3.jpg'
import hotel4 from './assets/hotel4.jpg'
import hotel5 from './assets/hotel5.png'
import hotel6 from './assets/hotel6.jpg'
import hotel7 from './assets/hotel7.jpg'
import hotel8 from './assets/hotel8.jpg'
import hotel9 from './assets/hotel9.avif'
import hotel10 from './assets/hotel10.jpg'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";


export function DashBoard(){
    const [hoteles, setHoteles]=useState([]);
    const [nombreHotel, setNombre]=useState("");
    const [ciudadHotel, setCiudad]=useState("");
    const [estrellasHotel, setEstrellas] =useState(0);
    const [mensaje, setMensaje] = useState("");

    const ciudades = [
        "Madrid",
        "Barcelona",
        "Sevilla",
        "Valencia",
        "Bilbao",
        "Granada",
        "Malaga",
        "Cordoba",
        "Alicante",
        "Tenerife"
    ];
    const estrellas = [1, 2, 3, 4, 5]; 

    const hotelImages={
        1: hotel1,
        2: hotel2,
        3: hotel3,
        4: hotel4,
        5: hotel5, 
        6: hotel6,
        7: hotel7,
        8: hotel8,
        9: hotel9,
        10: hotel10
    }

    async function fetchHoteles(){
        const data= await API.MostrarHoteles();
        setHoteles(data);
    }

    useEffect(()=>{        
        fetchHoteles();
    }, []);

    useEffect(()=>{
        if (nombreHotel || ciudadHotel || estrellasHotel) {
            async function fetchFiltradoHoteles() {
                try {
                    const response = await API.FiltrarHoteles(nombreHotel, ciudadHotel, estrellasHotel);
                    if (!response.exito) {
                        setMensaje(response.mensaje);
                        setHoteles([]);
                    } else {
                        setHoteles(response.datos);
                        setMensaje("");
                    }
                } catch (error) {
                    setMensaje("No se encontraron resultados de busqueda");
                    setHoteles([]);
                }
            }
            if (nombreHotel || ciudadHotel!="" || estrellasHotel) {
                fetchFiltradoHoteles();
            }else{                
                fetchHoteles();
            }
        } else {
            setHoteles([]);
            setMensaje("");
        }
    }, [nombreHotel, ciudadHotel, estrellasHotel])

    function handleRecargar(){
        setNombre("")
        setCiudad("")
        setEstrellas(0)
        setMensaje("")
        fetchHoteles();
    }

    const StarRating = ({ rating }) => {
        const totalStars = 5;
        const stars = [];

        for (let i = 0; i < totalStars; i++) {
            if (rating >= i + 1) {
                stars.push(<FaStar key={i} color="gold" />);
            } else if (rating >= i + 0.5) {
                stars.push(<FaStarHalfAlt key={i} color="gold" />);
            } else {
                stars.push(<FaRegStar key={i} color="gold" />);
            }
        }

        return <div style={{display:'flex', alignItems:'center', marginLeft:'450px'}}>{stars}</div>;
    };

    return(
        <>
            <Header/>
            <Center>
                <Heading color="#007BFF">HOTELES DISPONIBLES</Heading>
            </Center>
            
            <Box>                
                <Container maxW='container.lg'>
                    <Flex align='center' mt='30px' >
                        <Text color="#007BFF">Nombre del Hotel:</Text>
                        <Input mr='30px' w='10%' type='text' value={nombreHotel} onChange={event=>setNombre(event.target.value)}></Input>
                        
                        
                        <Text color="#007BFF">Ciudad del Hotel:</Text>
                        <Select mr='30px' w='10%' placeholder="Selecciona una ciudad" value={ciudadHotel} onChange={event=>setCiudad(event.target.value)}>
                            {ciudades.map(ciudad=>(
                                <option key={ciudad} value={ciudad}>{ciudad}</option>
                            ))}    
                        </Select>
                        
                        <Text color="#007BFF">Numero de Estrellas del Hotel</Text>
                        <Select mr='30px' w='10%' placeholder="Selecciona una cantidad de estrellas" value={estrellasHotel} onChange={event=>setEstrellas(event.target.value)}>
                            {estrellas.map(estrella=>(
                                <option value={estrella}>{estrella}</option>
                            ))}    
                        </Select>
                        <Button color='white' bgGradient='linear(to-r, teal.500, green.500)' _hover={{bgGradient: 'linear(to-r, red.500, yellow.500)',}} onClick={handleRecargar}>Recargar</Button>
                    </Flex>
                </Container>
            </Box>
            <Center mt='50px'>
                {mensaje && <Text fontSize={30} color="red.500">{mensaje}</Text>} {/* Mostrar mensaje si existe */}
            </Center>
            
            <Box className="hoteles-container" mt='50px' bg='#FFFFFF'>
                <SimpleGrid columns={{sm:1, md:2, lg:3}} spacing='20px'>
                    {hoteles.map(hotel=>(
                        <Link to={'/hotel/'+hotel.id} key={hotel.id}>
                            <Box className="hotel-box" boxShadow='2xl' borderRadius='md' width='95%' p='20px' rounded='md' bg="#F8F9FA" _hover={{
                                        bgGradient: "linear(to-r, teal.500, green.500)",
                                        transform: "scale(1.05)",
                                        transition: "transform 0.2s ease-in-out"
                                    }}>
                                <Image src={hotelImages[hotel.id]} w='100%' h='300' objectFit="cover"></Image>
                                <Heading>{hotel.nombre}</Heading>
                                <Text>{hotel.direccion}</Text>
                                <Text>{hotel.ciudad}</Text>
                                <StarRating rating={hotel.numeroEstrellas}/>
                            </Box>
                        </Link>  
                    ))}
                </SimpleGrid>
            </Box>
        </>
    )
}
