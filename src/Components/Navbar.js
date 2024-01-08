import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from '../context/LoginContext';

export default function Navbar({ login }) {

    const { setModalOpen } = useContext(LoginContext)
    const loginStatus = () => {
        const token = localStorage.getItem("jwt");
        if (login || token) {
            return [
                <>
                   
                    <Link to="/addproduct">
                        <li>Add Product</li>
                    </Link>
                    <Link to="/viewproduct">
                        <li>View Product</li>
                    </Link>
                    <Link to="/orders">
                        <li>Orders</li>
                    </Link>
                    <Link to="">
                        <button className="primaryBtn" onClick={() => {
                            setModalOpen(true)
                        }}>Log Out</button>
                    </Link>
                    
                </>,
            ];
        } else {
            return [
                <>
                    <Link to="/signup">
                        <li className="primaryBtn2">signup</li>
                    </Link>
                    <Link to="/signin">
                        <li className="primaryBtn2">signin</li>
                    </Link>
                </>,
            ];
        }
    };


  return (
    <div className='navbar'>
        <h1>Navbar</h1>
        <ul className="nav-menu">
                {loginStatus()}
            </ul>
    </div>
  )
}
