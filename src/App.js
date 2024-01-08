import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import './App.css';

import {LoginContext} from './context/LoginContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/Signin";
import Modal from "./Components/Modal";
import AddProduct from './Components/AddProduct'
import ViewProduct from './Components/ViewProduct'
import Orders from './Components/Orders'


function App() {

  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);


  return (
    <BrowserRouter>
    <div className="App">
        <LoginContext.Provider value ={{setUserLogin , setModalOpen}}>
        <Navbar login={userLogin}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/addproduct" element={<AddProduct />}></Route>
          <Route path="/viewproduct" element={<ViewProduct />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
        <ToastContainer theme="dark" />
        {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    
    
    </BrowserRouter>
  );
}

export default App;
