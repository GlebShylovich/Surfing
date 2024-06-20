import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Register from '../Pages/Register/Register'
import Login from '../Pages/Login/Login'
import Profile from '../Pages/Profile/Profile'
import Error from '../Pages/Error/Error'
import Auth from '../Pages/Auth/Auth'
import './App.scss'
export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='auth' element={<Auth/>}/>
        <Route path='/registration' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/404' element={<Error/>}/>
      </Routes>
    </>
  )
}