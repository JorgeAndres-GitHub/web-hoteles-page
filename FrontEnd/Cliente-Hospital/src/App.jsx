import { Registro } from './Registro'
import { Routes, Route } from 'react-router-dom'
import { Login } from './Login'
import { DashBoard } from './Dashboard'
import { Hotel } from './Hotel'
import { Perfil } from './Perfil'

export function App() {

  return (
    <Routes>
      <Route path='/' element={<Registro/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
      <Route path='/hotel/:hotelId' element={<Hotel/>}/>
      <Route path='perfil/:clienteCedula' element={<Perfil/>}/>
    </Routes>
  )
}


