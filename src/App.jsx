import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Details from './pages/details/Details'
import Edit from './pages/edit/Edit'

export default function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/create' element={<Create/>}></Route>
      <Route path='/details/:userId' element={<Details/>}></Route>
      <Route path='/edit/:userId' element={<Edit/>}></Route>


    </Routes>
    <Footer/>
    </>
  )
}
