import React, { useState, useContext } from "react";
// import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";

export default function Signin() {
    const { setUserLogin } = useContext(LoginContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const postData = () => {
        //checking Email
        if (!emailRegex.test(email)) {
            notifyA("Invalid Email");
            return;
        }

        //sending data to server
        fetch("http://localhost:5000/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    notifyA(data.error);
                } else {
                    notifyB("Signed In successfullly");
                    console.log(data);
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    setUserLogin(true);
                    navigate("/");
                }

                console.log(data);
            });
    };


    return (
        <div className='signin'>
            <div className="form-container">
                <h1>Merchant SignIn Page</h1>
            </div>
            <div>
                <input type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }}
                />
            </div>
            <div>
                <input type="password" name="pass" id="pass" placeholder="Password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }}
                />
            </div>

            <input type="submit" value="Sign In" id="submit-btn" onClick={() => {
                postData()
            }}
            />

        </div>
    )
}
