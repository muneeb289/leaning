import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./Component/Login.js"
import Signup from './Component/Signup.js';
import Home from './Pages/Home.js';
// import Route from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />


      </Routes>
    </div>
  );
}

export default App;
