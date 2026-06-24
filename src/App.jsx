

import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home'
import './index.css'
import { Dashboard } from './pages/Dashboard'
import { EditApplication } from './pages/EditApplication'
import { Navbar } from './components/layout/Navbar'
import { AddApplication } from './pages/AddApplication'
import { Applications } from './pages/Applications'

function App() {

  return (
    <>
      
      <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      < Route  path="/AddApplication" element={<AddApplication/>}/>
      <Route path='/Applications' element={<Applications/>} />
      <Route  path='/EditApplication' element={<EditApplication/>}/>
    </Routes>
    
     

    </>
  )
}

export default App
