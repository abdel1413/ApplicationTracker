

import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home'
import './index.css'
import { Dashboard } from './pages/Dashboard'
import { EditApplication } from './pages/EditApplication'
import { Navbar } from './components/layout/Navbar'
import { AddApplication } from './pages/AddApplication'
import { Applications } from './pages/Applications'
import { NotFound } from './pages/NotFound'
import { ViewApplication } from './pages/ViewApplication'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
 
  return (
    <>
      
      <Navbar />

      <ToastContainer 
      position="bottom-right"
       autoClose={5000} 
       hideProgressBar={false}
        newestOnTop={false} 
        closeOnClick rtl={false} 
        pauseOnFocusLoss 
        draggable pauseOnHover 
        theme="light" />  

    <Routes>
      <Route path="/" 
      element={<Dashboard/>}/>

      < Route  path="/Add" 
      element={<AddApplication/>}/>

      <Route path='/Applications'
       element={<Applications/>} />
       <Route path='applications/:id' element={<ViewApplication/>}/>

      <Route  path='/edit/:id'
       element={<EditApplication/>}/>

      <Route path='*' 
      element={<NotFound />}
      
      />
    </Routes>
    
     

    </>
  )
}

export default App
