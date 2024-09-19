import React from 'react'
import {Route,Routes} from 'react-router-dom'
import './Gueststyle.css'
import Home from './Home'
import User from './User'
import Head from './Head'
import Shop from './Shop'
import Login from './Login'

const App = () => {
  return (
    <div className='admin-mainG'>
      <div className='headG'>
      <Head />
      </div>
      <div className='adminHomeG'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Guest/User' element={<User/>}/>
        <Route path='/Guest/Shop' element={<Shop/>}/>
        <Route path='/Guest/Login' element={<Login/>}/>
      </Routes>
      </div>
      </div>
  )
}

export default App