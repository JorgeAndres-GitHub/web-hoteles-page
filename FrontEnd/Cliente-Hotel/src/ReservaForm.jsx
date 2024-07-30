import { useEffect, useState } from "react"
import { Header } from "./Header";
import { useParams } from "react-router-dom";
import * as API from './services/data'
import { Box, Button, Center, FormControl, Heading, Input, Select, Text } from "@chakra-ui/react";
import { FaHotel } from "react-icons/fa6";

export function ReservaForm(){
    let params=useParams();
    const cedula=sessionStorage.getItem("cedula");
    const [cantidadPersonas, setCantidadPersonas] = useState();
    const [cantidadPersonasOpciones, setCantidadPersonasOpciones] =useState([])
    const [diaEntrada, setDiaEntrada] =useState("");
    const [mesEntrada, setMesEntrada]= useState("");
    const [anoEntrada, setAnoEntrada] =useState("");
    const [diaSalida, setDiaSalida] =useState("");
    const [mesSalida, setMesSalida] =useState("");
    const [anoSalida, setAnoSalida]=useState("");    

    useEffect(()=>{
        async function SetearHabitaciones(){
            const tipo= await API.TipoHabitacion(params.idHabitacion)
            if(tipo==='Sencilla'){
                setCantidadPersonasOpciones([1 ,2 ]);
            }else if(tipo==='Doble'){
                setCantidadPersonasOpciones([1, 2, 3, 4]);
            }else{
                setCantidadPersonasOpciones([1, 2, 3, 4, 5, 6]);
            }
        }
        SetearHabitaciones();
    }, [params.idHabitacion])

    async function insertarFechaDeEntrada(){
        const { value: date } = await Swal.fire({
            title: "Selecciona la fecha de entrada",
            input: "date",
            didOpen: () => {
              const today = (new Date()).toISOString();
              Swal.getInput().min = today.split("T")[0];
            }
          });
          
          if (date) {
            const [year, month, day] = date.split("-");
            Swal.fire("Fecha de Entrada", `Dia: ${day}, Mes: ${month}, Año: ${year}`);
            setDiaEntrada(day);
            setMesEntrada(month);
            setAnoEntrada(year);
            Swal.fire({
                title: "Fecha Ingresada",
                text: "Se ha ingresado la fecha de entrada correctamente",
                icon: "success"
            });
          }
    }

    async function insertarFechaDeSalida(){
        const { value: date } = await Swal.fire({
            title: "Selecciona la fecha de salida",
            input: "date",
            didOpen: () => {
              const today = (new Date()).toISOString();
              Swal.getInput().min = today.split("T")[0];
            }
        });
          
        if (date) {
            const [yearS, monthS, dayS] = date.split("-");
            Swal.fire("Fecha de Salida", `Dia: ${dayS}, Mes: ${monthS}, Año: ${yearS}`);
            setDiaSalida(dayS);
            setMesSalida(monthS);
            setAnoSalida(yearS);
            Swal.fire({
                title: "Fecha Ingresada",
                text: "Se ha ingresado la fecha de salida correctamente",
                icon: "success"
            });
        }
    }


    async function handleSubmit(e){
        e.preventDefault();
        const response= await API.IngresarAlHotel(cantidadPersonas, mesEntrada, anoEntrada, diaEntrada, mesSalida, anoSalida, diaSalida, cedula, params.idHabitacion);
        if(response=="true"){
            return Swal.fire({
                title: "Genial!",
                text: "Se ha reservado la habitación correctamente. Revise su correo, le llegara un archivo con los datos de su reserva",
                icon: "success"
              });
        }
        return Swal.fire({
            title: "Error",
            text: "No se ha podido reservar la habitación",
            icon: "error"
          });
    }

    return(
        <>
            <Header/>
            <Center>
                <Box boxShadow='xl' borderRadius='md' width={1000} p='20px' mt='50px'>
                    <form id='formulario' onSubmit={handleSubmit}>
                        <Center>
                            <Heading mt='30px'>Reserva de habitación</Heading>
                        </Center>
                        <Center mt='30px'>
                            <FaHotel size={100}/>
                        </Center>
                        <Center>
                            <Text mt='30px' fontWeight='bold' fontSize='18'>Fecha de entrada</Text>
                        </Center>
                        <Center>
                            <FormControl width='40%' mt='10px'>
                                <Center>
                                    <Button onClick={insertarFechaDeEntrada} w='100%' bgGradient="linear(to-r, teal.400, blue.400)" _hover={{ bgGradient: "linear(to-r, teal.500, blue.500)" }}>Insertar Fecha de Ingreso</Button>
                                </Center>
                            </FormControl>
                        </Center>
                        <Center>
                            <Text mt='20px' fontWeight='bold' fontSize='18'>Fecha de salida</Text>
                        </Center>
                        <Center>
                            <FormControl width='40%' mt='10px'>
                                <Center>
                                    <Button onClick={insertarFechaDeSalida} w='100%' bgGradient="linear(to-r, teal.400, blue.400)" _hover={{ bgGradient: "linear(to-r, teal.500, blue.500)" }}>Insertar Fecha de Salida</Button>
                                </Center>                                
                            </FormControl>
                        </Center>
                        <Center>
                            <FormControl width='40%' mt='10px'>
                                <Box as="label">
                                    <Center>
                                        <Text fontWeight='bold' fontSize='18' mt='20px'>Cantidad de Personas:</Text>
                                    </Center>
                                    <Select required value={cantidadPersonas} onChange={event=>setCantidadPersonas(event.target.value)}
                                        bgGradient="linear(to-r, teal.300, blue.300)"
                                        _hover={{ bgGradient: "linear(to-r, teal.400, blue.400)" }}>
                                        <option value="">Seleccionar cantidad</option>
                                        {cantidadPersonasOpciones.map(cantidad=>(
                                            <option key={cantidad} value={cantidad}>{cantidad}</option>
                                        ))}
                                    </Select>
                                </Box>
                            </FormControl>
                        </Center>            
                        <Center>
                            <FormControl width='40%' mt='40px'>
                                <Input type="submit" id='insertar' value='Reservar' borderColor='blue' bgGradient="linear(to-r, orange.400, pink.400)" _hover={{ bgGradient: "linear(to-r, orange.500, pink.500)" }}></Input>
                            </FormControl>
                        </Center>    
                    </form>          
                </Box> 
            </Center>
        </>
    )
}