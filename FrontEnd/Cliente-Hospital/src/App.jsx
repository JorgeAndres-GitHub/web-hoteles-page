import { Registro } from './Registro'
import { Routes, Route } from 'react-router-dom'
import { Login } from './Login'
import { DashBoard } from './Dashboard'
import { Hotel } from './Hotel'
import { Perfil } from './Perfil'
import { ReservaForm } from './ReservaForm'
import { Dinero } from './dinero'
import { DatosActualizados } from './DatosActualizados'

export function App() {

  return (
    <Routes>
      <Route path='/' element={<Registro/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
      <Route path='/hotel/:hotelId' element={<Hotel/>}/>
      <Route path='/perfil/:clienteCedula' element={<Perfil/>}/>
      <Route path='/reserva/:idHabitacion' element={<ReservaForm/>}/>
      <Route path='/dinero' element={<Dinero/>}/>
      <Route path='/actualizarDatos' element={<DatosActualizados/>}/>
    </Routes>
  )
}


