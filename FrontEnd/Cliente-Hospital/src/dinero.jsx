import { useState } from 'react';
import * as API from './services/data';
import imagen from './assets/visa.jpg';
import imagen2 from './assets/paypal.png';
import { Header } from './Header';
import { Heading, Center, FormControl, FormLabel, Input, Image, Text, Stack, Box } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@chakra-ui/react'

export function Dinero(){
    const cedula=sessionStorage.getItem("cedula");
    const [dinero, setDinero]=useState();

    async function handleSubmit(e){
        e.preventDefault();
        const response=await API.AgregarDinero(cedula, dinero);
        if(response=="true"){
            alert("Se ha agregado el dinero correctamente a tu cuenta");
        }else{
            alert("Hubo un error al intentar agregar dinero a la cuenta");
        }
    }

    return(
        <>
            <Header/>
            <Box minH="100vh" bgGradient="linear(to-r, #B3E5FC, #E1BEE7)">
                <Center>
                    <Heading mt='50px'>Agregar Dinero a la Cuenta</Heading>
                </Center>
                <Center>
                    <Box boxShadow='xl' borderRadius='md' width='40%' p='20px' bgGradient="linear(to-r, #FFECB3, #F8BBD0)" mt='30px'>
                        <form id='form' onSubmit={handleSubmit}>
                            <Center>
                                <Text fontSize='20'>Metodo de pago:</Text>
                            </Center>                            
                                <FormControl mt='20px'>
                                    <Center>
                                        <RadioGroup >
                                            <Stack direction='row'>
                                                <Radio value='visa' borderColor='teal'></Radio>
                                                <Image src={imagen} width='50px'></Image>
                                                <Radio value='paypal' borderColor='teal'></Radio>
                                                <Image src={imagen2} width='100px'></Image>
                                            </Stack>
                                        </RadioGroup>     
                                    </Center>                            
                                </FormControl>                            
                            <FormControl mt='20px'>
                                <Center>
                                    <FormLabel fontSize='18'>Valor a ingresar: </FormLabel>
                                </Center>
                                <Input type='number' borderColor='teal' step='0.01' value={dinero} onChange={event=>setDinero(event.target.value)}></Input>
                            </FormControl> 
                            <FormControl>
                                <Input mt='20px' type='submit' id='Subir' value='Enviar Dinero' borderColor='teal'></Input>
                            </FormControl>                             
                        </form>
                    </Box>
                </Center>
            </Box>
        </>
    )
}